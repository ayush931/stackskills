'use client';

import React, { useEffect, useState } from 'react';
import WelcomePopup from '@/components/home/WelcomePopup';
import Navigation from '@/components/home/Navigation';
import HeroSection from '@/components/home/HeroSection';
import PartnershipSection from '@/components/home/PartnershipSection';
import CoursesSection from '@/components/home/CoursesSection';
import PricingSection from '@/components/home/PricingSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/home/Footer';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <WelcomePopup showPopup={showPopup} setShowPopup={setShowPopup} />
      <Navigation
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        closeMobileMenu={closeMobileMenu}
      />
      <HeroSection isVisible={isVisible} />
      <PartnershipSection />
      <CoursesSection />
      <PricingSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
