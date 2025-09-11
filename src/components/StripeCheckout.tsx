import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, Lock, Loader } from 'lucide-react';
import { StripeProduct } from '../stripe-config';

// Carregue o Stripe com a sua chave publicável (fora do componente)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

interface StripeCheckoutProps {
  product: StripeProduct;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ product, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // 1. Chame a nossa Supabase Edge Function para criar a sessão
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ priceId: product.priceId }),
      });

      const { sessionId, error: functionError } = await response.json();

      if (functionError) {
        throw new Error(functionError);
      }

      // 2. Redirecione o utilizador para a página de pagamento do Stripe
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe.js has not loaded yet.');
      }
      
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error(error.message);
      }

      onSuccess?.();
    } catch (error: any) {
      console.error('Checkout error:', error);
      onError?.(error.message || 'An error occurred during checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader className="w-5 h-5 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <CreditCard className="w-5 h-5" />
          <span>
            {product.mode === 'subscription'
              ? `Subscribe for £${product.price}/month`
              : `Pay £${product.price}`
            }
          </span>
          <Lock className="w-4 h-4" />
        </>
      )}
    </button>
  );
};

export default StripeCheckout;