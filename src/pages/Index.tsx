
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ToolShowcase from '@/components/ToolShowcase';
import TourSection from '@/components/TourSection';
import PricingSection from '@/components/PricingSection';
import FaqSection from '@/components/FaqSection';
import UpdatesSection from '@/components/UpdatesSection';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialSection from '@/components/TestimonialSection';
import NotificationBanner from '@/components/NotificationBanner';
import AuthModals from '@/components/AuthModals';

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <NotificationBanner message="Big news, we reduced our fees" linkText="Learn More" linkUrl="#pricing" />
      <Navbar 
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsSignupOpen(true)}
      />
      <main className="flex-1">
        <HeroSection />
        <ToolShowcase />
        <TestimonialSection />
        <TourSection />
        <PricingSection />
        <FaqSection />
        <UpdatesSection />
        <BenefitsSection />
      </main>
      <Footer />
      
      <AuthModals
        isLoginOpen={isLoginOpen}
        isSignupOpen={isSignupOpen}
        onLoginClose={() => setIsLoginOpen(false)}
        onSignupClose={() => setIsSignupOpen(false)}
      />
    </div>
  );
};

export default Index;
