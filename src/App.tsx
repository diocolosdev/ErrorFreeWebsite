import React, { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './components/Auth/AuthProvider';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import Dashboard from './components/Dashboard/Dashboard';
import SuccessPage from './components/SuccessPage';
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

function HomePage() {
  const [showBooking, setShowBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmationData, setConfirmationData] = useState<any>(null);
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

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
          <Hero onBookNow={handleBookNow} hasAnalyticsConsent={hasConsent} />
          <Services />
          <Pricing />
          <BusinessPlans />
          <TrustSection />
          <Coverage />
          <Reviews />
          <FAQ />
          <Contact />
          <Footer />
          <StickyCTAs onBookNow={handleBookNow} hasAnalyticsConsent={hasConsent} />
          
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
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

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

export default App;