import React, { useState } from 'react';
import { HeroSection } from '@/components/ui/hero-section-1';
import AuthModals from '@/components/AuthModals';

const HeroDemo = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openLoginModal = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  const openSignupModal = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  return (
    <div className="min-h-screen">
      <HeroSection 
        onLoginClick={openLoginModal}
        onSignupClick={openSignupModal}
      />
      
      <AuthModals
        isLoginOpen={isLoginOpen}
        isSignupOpen={isSignupOpen}
        onLoginClose={() => setIsLoginOpen(false)}
        onSignupClose={() => setIsSignupOpen(false)}
        onSwitchToSignup={openSignupModal}
        onSwitchToLogin={openLoginModal}
      />
    </div>
  );
};

export default HeroDemo; 