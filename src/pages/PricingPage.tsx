import React from 'react';
import { Pricing } from "@/components/ui/pricing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <div className="bg-gradient-to-b from-muted/50 to-background pt-20 pb-10">
          <div className="container px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing Plans</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the perfect plan that fits your needs. All plans include core features
              with different quota limits.
            </p>
          </div>
        </div>
        
        <Pricing 
          plans={pricingPlans}
          title="Transparent Pricing for Every Need"
          description="Choose the plan that works for you
All plans include access to our platform, AI-powered tools, and dedicated support."
        />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage; 