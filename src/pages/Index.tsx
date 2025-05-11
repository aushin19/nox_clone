
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ToolShowcase from '@/components/ToolShowcase';
import TourSection from '@/components/TourSection';
import PricingSection from '@/components/PricingSection';
import FaqSection from '@/components/FaqSection';
import UpdatesSection from '@/components/UpdatesSection';
import BenefitsSection from '@/components/BenefitsSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ToolShowcase />
        <TourSection />
        <PricingSection />
        <FaqSection />
        <UpdatesSection />
        <BenefitsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
