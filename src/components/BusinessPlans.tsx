import React from 'react';
import { Building, Users, Shield, CheckCircle, Star } from 'lucide-react';
import { getProductsByCategory } from '../stripe-config';
import StripeCheckout from './StripeCheckout';
import { useAuth } from './Auth/AuthProvider';

const BusinessPlans = () => {
  const { user } = useAuth();
  const businessProducts = getProductsByCategory('business');

  const getFeaturesByPlan = (planName: string) => {
    if (planName.includes('Bronze')) {
      return [
        "4 hours remote support/month",
        "Basic monitoring",
        "Email support",
        "Software updates",
        "Basic security setup"
      ];
    } else if (planName.includes('Silver')) {
      return [
        "8 hours remote support/month",
        "2 on-site visits/month",
        "24/7 monitoring",
        "Priority support",
        "Security management",
        "Backup solutions",
        "Network optimization"
      ];
    } else if (planName.includes('Gold')) {
      return [
        "Unlimited remote support",
        "4 on-site visits/month",
        "24/7 emergency response",
        "Dedicated account manager",
        "Advanced security suite",
        "Cloud management",
        "Strategic IT planning",
        "Training sessions"
      ];
    }
    return [];
  };

  const getColorByPlan = (planName: string) => {
    if (planName.includes('Bronze')) return "from-amber-400 to-amber-600";
    if (planName.includes('Silver')) return "from-gray-400 to-gray-600";
    if (planName.includes('Gold')) return "from-yellow-400 to-yellow-600";
    return "from-blue-400 to-blue-600";
  };

  return (
    <section id="business" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Building className="w-12 h-12 text-blue-400" />
            <h2 className="text-4xl font-bold">Business Retainer Plans</h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Proactive IT support that keeps your business running smoothly. Choose the plan that fits your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {businessProducts.map((product, index) => {
            const features = getFeaturesByPlan(product.name);
            const color = getColorByPlan(product.name);
            const planName = product.name.split(' ').pop() || 'Plan';
            
            return (
              <div key={index} className={`bg-white text-gray-900 rounded-2xl p-8 shadow-xl transform transition-all duration-300 hover:scale-105 ${product.popular ? 'ring-4 ring-blue-500' : ''}`}>
                {product.popular && (
                  <div className="bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-full inline-flex items-center space-x-1 mb-6">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                )}
                
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-6`}>
                  <span className="text-white text-2xl font-bold">{planName[0]}</span>
                </div>
                
                <h3 className="text-3xl font-bold mb-2">{planName}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-blue-600">£{product.price}</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                
                <p className="text-gray-600 mb-8">{product.description}</p>
                
                <ul className="space-y-4 mb-8">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {user ? (
                  <StripeCheckout product={product} />
                ) : (
                  <a
                    href="/login"
                    className={`block w-full text-center py-4 px-6 rounded-xl font-semibold transition-colors ${product.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}
                  >
                    Sign In to Subscribe
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {!user && (
          <div className="text-center mb-12">
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Ready to Get Started?</h3>
              <p className="text-blue-800 mb-6">
                Create an account to subscribe to our business plans and manage your IT support services.
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="/signup"
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Create Account
                </a>
                <a
                  href="/login"
                  className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {businessProducts.map((product, index) => {
            const features = getFeaturesByPlan(product.name);
            const color = getColorByPlan(product.name);
            const planName = product.name.split(' ').pop() || 'Plan';
            
            return (
              <div key={index} className={`bg-white text-gray-900 rounded-2xl p-8 shadow-xl transform transition-all duration-300 hover:scale-105 ${product.popular ? 'ring-4 ring-blue-500' : ''}`}>
                {product.popular && (
                <div className="bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-full inline-flex items-center space-x-1 mb-6">
                  <Star className="w-4 h-4" />
                  <span>Most Popular</span>
                </div>
                )}
              
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-6`}>
                  <span className="text-white text-2xl font-bold">{planName[0]}</span>
                </div>
              
                <h3 className="text-3xl font-bold mb-2">{planName}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-blue-600">£{product.price}</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
              
                <p className="text-gray-600 mb-8">{product.description}</p>
              
                <ul className="space-y-4 mb-8">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              
                {user ? (
                  <StripeCheckout product={product} />
                ) : (
                  <a
                    href="/login"
                    className={`block w-full text-center py-4 px-6 rounded-xl font-semibold transition-colors ${product.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}
                  >
                    Sign In to Subscribe
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Business Services */}
        <div className="bg-gray-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Additional Business Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Cybersecurity Audits</h4>
              <p className="text-gray-300">Comprehensive security assessment and recommendations</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Staff Training</h4>
              <p className="text-gray-300">IT skills training and cybersecurity awareness</p>
            </div>
            <div className="text-center">
              <Building className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Office Setup</h4>
              <p className="text-gray-300">Complete IT infrastructure planning and implementation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/success" 
              element={
                <ProtectedRoute>
                  <SuccessPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default BusinessPlans;