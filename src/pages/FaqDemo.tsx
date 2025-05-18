import React from 'react';
import Header from '@/components/Header';
import { Footer } from '@/components/ui/footer-section';
import FaqSection from '@/components/FaqSection';

const FaqDemo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <div className="pt-20 pb-10 bg-gradient-to-b from-muted/30 to-transparent">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">FAQ Page</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Demo of the redesigned FAQ section with modern UI and animations
            </p>
          </div>
        </div>
        
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
};

export default FaqDemo; 