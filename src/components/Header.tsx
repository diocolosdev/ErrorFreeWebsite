import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-sm font-medium">
        🚨 IT EMERGENCY? Call Now: <a href="tel:02071234567" className="font-bold underline">020 7123 4567</a> • 24/7 Available
      </div>
      
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">ErrorFree 24/7</h1>
                  <p className="text-xs text-gray-600">IT Solutions Anytime. Anywhere.</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#business" className="text-gray-700 hover:text-blue-600 transition-colors">Business Plans</a>
              <a href="#coverage" className="text-gray-700 hover:text-blue-600 transition-colors">Coverage</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <a href="tel:02071234567" className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                <Phone className="w-4 h-4" />
                <span className="font-medium">020 7123 4567</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-3">
                <a href="#services" className="text-gray-700 hover:text-blue-600 px-2 py-1">Services</a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 px-2 py-1">Pricing</a>
                <a href="#business" className="text-gray-700 hover:text-blue-600 px-2 py-1">Business Plans</a>
                <a href="#coverage" className="text-gray-700 hover:text-blue-600 px-2 py-1">Coverage</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 px-2 py-1">Contact</a>
                <a href="tel:02071234567" className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors mx-2 mt-4">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">Call Emergency</span>
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;