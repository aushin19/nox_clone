import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { pricingPlans, features } from "@/data/pricing";
import AuthModals from "@/components/AuthModals";

const PricingSection = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleGetMembership = () => {
    setIsSignupOpen(true);
  };

  return (
    <section id="pricing" className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple pricing, incredible value. Choose the plan that fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`flex flex-col ${plan.badge === "Most Popular" ? 
                "border-primary/50 shadow-lg shadow-primary/20" : ""}`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.badge && (
                    <Badge variant={plan.badge === "Most Popular" ? "default" : "secondary"}>
                      {plan.badge}
                    </Badge>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.billing}</span>
                  {plan.savings && (
                    <p className="text-primary text-sm font-medium mt-1">{plan.savings}</p>
                  )}
                </div>
                <ul className="space-y-2">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={18} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.badge === "Most Popular" ? "default" : "outline"}
                  onClick={handleGetMembership}
                >
                  Get Membership
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <AuthModals 
        isSignupOpen={isSignupOpen}
        isLoginOpen={isLoginOpen}
        onSignupClose={() => setIsSignupOpen(false)}
        onLoginClose={() => setIsLoginOpen(false)}
      />
    </section>
  );
};

export default PricingSection;
