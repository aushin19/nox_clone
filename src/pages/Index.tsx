import React, { useState } from 'react';
import { Footer } from '@/components/ui/footer-section';
import { HeroSection } from '@/components/ui/hero-section-1';
import ToolShowcase from '@/components/ToolShowcase';
import TourSection from '@/components/TourSection';
import FaqSection from '@/components/FaqSection';
import UpdatesSection from '@/components/UpdatesSection';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialsMarquee from '@/components/TestimonialsMarquee';
import AuthModals from '@/components/AuthModals';
import { Pricing } from '@/components/ui/pricing';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const pricingPlans = [
  {
    name: "STARTER",
    price: "50",
    yearlyPrice: "40",
    period: "per month",
    features: [
      "Up to 10 projects",
      "Basic analytics",
      "48-hour support response time",
      "Limited API access",
      "Community support",
    ],
    description: "Perfect for individuals and small projects",
    buttonText: "Start Free Trial",
    href: "/sign-up",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "99",
    yearlyPrice: "79",
    period: "per month",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "24-hour support response time",
      "Full API access",
      "Priority support",
      "Team collaboration",
      "Custom integrations",
    ],
    description: "Ideal for growing teams and businesses",
    buttonText: "Get Started",
    href: "/sign-up",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "299",
    yearlyPrice: "239",
    period: "per month",
    features: [
      "Everything in Professional",
      "Custom solutions",
      "Dedicated account manager",
      "1-hour support response time",
      "SSO Authentication",
      "Advanced security",
      "Custom contracts",
      "SLA agreement",
    ],
    description: "For large organizations with specific needs",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
  },
];

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const openLoginModal = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  const openSignupModal = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  // Create a modified copy of pricing plans with correct button behavior
  const updatedPricingPlans = pricingPlans.map(plan => ({
    ...plan,
    buttonText: isAuthenticated ? "Go to Dashboard" : plan.buttonText,
    href: isAuthenticated ? "/dashboard" : plan.href === "/sign-up" ? "#signup" : plan.href,
    handleClick: isAuthenticated 
      ? () => navigate('/dashboard/subscription')
      : () => openSignupModal()
  }));

  return (
    <div className="min-h-screen flex flex-col">
      {/* <NotificationBanner message="Big news, we reduced our fees" linkText="Learn More" linkUrl="#pricing" /> */}
      <main className="flex-1">
        <HeroSection 
          onLoginClick={openLoginModal}
          onSignupClick={openSignupModal}
        />
        <TestimonialsMarquee />
        
        <div id="features">
          <ToolShowcase />
        </div>
        
        <div id="tour">
          <TourSection />
        </div>
        
        <div id="benefits">
          <BenefitsSection />
        </div>
        
        <div id="pricing">
          <Pricing 
            plans={updatedPricingPlans}
            title="Simple, Transparent Pricing"
            description="Choose the plan that works for you
All plans include access to our platform, AI-powered tools, and dedicated support."
          />
        </div>
        
        <div id="faq">
          <FaqSection />
        </div>
        
        <div id="updates">
          <UpdatesSection />
        </div>
      </main>
      <Footer />
      
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

export default Index;
