import React, { useState } from 'react';
import { Phone, MessageSquare, Calendar, Shield, Clock, MapPin, Star, CheckCircle, Zap, Monitor, Home, Building, Users } from 'lucide-react';
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

function App() {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero onBookNow={() => setShowBooking(true)} />
      <Services />
      <Pricing />
      <BusinessPlans />
      <TrustSection />
      <Coverage />
      <Reviews />
      <FAQ />
      <Contact />
      <Footer />
      <StickyCTAs onBookNow={() => setShowBooking(true)} />
      
      {showBooking && (
        <BookingWidget 
          isOpen={showBooking}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
}

export default App;