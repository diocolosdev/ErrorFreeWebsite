import React, { useState } from 'react';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import BusinessPlans from './components/BusinessPlans';
import Coverage from './components/Coverage';
import TrustSection from './components/TrustSection';
import BookingWidget from './components/BookingWidget';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StickyCTAs from './components/StickyCTAs';
import ConsentBanner from './components/ConsentBanner';
import PaymentConfirmation from './components/PaymentConfirmation';
import { initGA, trackPageView, trackBookingStart } from './lib/analytics';

function App() {
  const [showBooking, setShowBooking] = useState(false);
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmationData, setConfirmationData] = useState<any>(null);

  useEffect(() => {
    // Check for existing consent
    const consent = localStorage.getItem('ga-consent');
    if (consent === 'accepted') {
      setHasConsent(true);
      initializeGA();
    } else if (consent === 'declined') {
      setHasConsent(false);
    }
  }, []);

  const initializeGA = () => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId) {
      initGA(measurementId);
      trackPageView(window.location.pathname);
    }
  };

  const handleConsentAccept = () => {
    setHasConsent(true);
    initializeGA();
  };

  const handleConsentDecline = () => {
    setHasConsent(false);
  };

  const handleBookNow = () => {
    setShowBooking(true);
    if (hasConsent) {
      trackBookingStart();
    }
  };

  const handleBookingConfirmed = (bookingData: any) => {
    setShowBooking(false);
    setBookingConfirmed(true);
    setConfirmationData(bookingData);
  };

  const handleBackToHome = () => {
    setBookingConfirmed(false);
    setConfirmationData(null);
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white">
        {bookingConfirmed && confirmationData ? (
          <PaymentConfirmation
            bookingReference={confirmationData.bookingReference}
            bookingData={confirmationData.bookingData}
            amount={confirmationData.amount}
            paymentMethod={confirmationData.paymentMethod}
            onBackToHome={handleBackToHome}
          />
        ) : (
          <>
            <Header />
            <Hero onBookNow={handleBookNow} />
            <Services />
            <Pricing />
            <BusinessPlans />
            <TrustSection />
            <Coverage />
            <Reviews />
            <FAQ />
            <Contact />
            <Footer />
            <StickyCTAs onBookNow={handleBookNow} />
            
            {showBooking && (
              <BookingWidget 
                isOpen={showBooking}
                onClose={() => setShowBooking(false)}
                onBookingConfirmed={handleBookingConfirmed}
                hasAnalyticsConsent={hasConsent}
              />
            )}
          </>
        )}
        
        {hasConsent === null && (
          <ConsentBanner
            onAccept={handleConsentAccept}
            onDecline={handleConsentDecline}
          />
        )}
      </div>
    </HelmetProvider>
  );
}

export default App;