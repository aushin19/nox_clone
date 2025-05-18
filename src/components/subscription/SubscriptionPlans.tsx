import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, X, Zap, Shield, ArrowRight } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import RazorpayCheckout from './RazorpayCheckout';
import { Button } from '@/components/ui/button';

interface Plan {
  id: string;
  name: string;
  price: number;
  durationMonths: number;
  description: string;
  features: string[];
  notIncluded?: string[];
  isPopular?: boolean;
  color?: string;
  icon?: React.ReactNode;
}

const plans: Plan[] = [
  {
    id: 'basic-monthly',
    name: 'Basic Plan',
    price: 499,
    durationMonths: 1,
    description: 'Perfect for beginners',
    features: [
      'Access to basic tools',
      'Limited usage per month',
      'Standard support',
      'Community access'
    ],
    notIncluded: [
      'Premium tools access',
      'API access',
      'Priority support'
    ],
    color: 'from-blue-500 to-blue-600',
    icon: <Shield className="h-5 w-5" />
  },
  {
    id: 'premium-monthly',
    name: 'Premium Plan',
    price: 999,
    durationMonths: 1,
    description: 'Best for professionals',
    features: [
      'Access to all premium tools',
      'Unlimited usage',
      'Priority support',
      'New tools as they launch',
      'API access'
    ],
    isPopular: true,
    color: 'from-primary to-purple-500',
    icon: <Zap className="h-5 w-5" />
  },
  {
    id: 'premium-annual',
    name: 'Premium Annual',
    price: 9990,
    durationMonths: 12,
    description: 'Best value for money',
    features: [
      'Access to all premium tools',
      'Unlimited usage',
      'Priority support',
      'New tools as they launch',
      'API access',
      'Advanced analytics',
      'Two months free'
    ],
    color: 'from-green-500 to-emerald-500',
    icon: <Sparkles className="h-5 w-5" />
  }
];

const SubscriptionPlans: React.FC = () => {
  const { hasSubscription, profile } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const handlePlanSelected = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleSuccess = () => {
    // Force reload after subscription to update UI
    window.location.reload();
  };

  const isCurrentPlan = (planId: string) => {
    return profile?.plan_sku === planId;
  };

  // Filter plans based on billing cycle
  const filteredPlans = plans.filter(plan => 
    billingCycle === 'monthly' ? plan.durationMonths === 1 : plan.durationMonths === 12
  );

  return (
    <div className="space-y-8">
      {/* Billing cycle toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 bg-secondary/10 rounded-full">
          <Button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={cn(
              "relative rounded-full px-4 text-sm transition-colors",
              billingCycle === 'monthly' 
                ? "bg-background text-foreground font-medium shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Monthly
          </Button>
          <Button
            type="button"
            onClick={() => setBillingCycle('annual')}
            className={cn(
              "relative rounded-full px-4 text-sm transition-colors",
              billingCycle === 'annual' 
                ? "bg-background text-foreground font-medium shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Annual
            <Badge className="ml-2 py-0 px-1.5 bg-green-500/20 text-green-500 border-green-500/30 text-[10px]">
              Save 17%
            </Badge>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {filteredPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={cn(
              "relative overflow-hidden transition-all duration-300 h-full flex flex-col",
              plan.isPopular 
                ? "border-primary shadow-md shadow-primary/10" 
                : "border-secondary/30 hover:border-secondary/80"
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0">
                <div className="bg-gradient-to-r from-primary/90 to-purple-500/90 text-white py-1 px-4 text-xs font-medium uppercase tracking-wider transform rotate-45 translate-x-[30%] translate-y-[-10%] shadow-sm">
                  Popular
                </div>
              </div>
            )}
            
            <CardHeader className={cn(
              "pb-3 relative overflow-hidden",
              plan.isPopular && "pt-10"
            )}>
              {/* Gradient background */}
              <div className={cn(
                "absolute inset-x-0 top-0 h-2 bg-gradient-to-r",
                plan.color || "from-primary to-blue-500"
              )} />
              
              <div className="flex items-center gap-2">
                <div className={cn(
                  "p-2 rounded-lg bg-gradient-to-r text-white",
                  plan.color || "from-primary to-blue-500"
                )}>
                  {plan.icon || <Zap className="h-5 w-5" />}
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pb-0 flex-1">
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <p className="text-3xl font-bold">
                    {formatPrice(plan.price)}
                  </p>
                  <span className="text-sm font-normal text-muted-foreground">
                    / {plan.durationMonths === 1 ? 'month' : 'year'}
                  </span>
                </div>
                {plan.durationMonths === 12 && (
                  <p className="text-sm text-green-500 mt-1">
                    Includes 2 months free
                  </p>
                )}
              </div>
              
              <div className="space-y-5">
                <div>
                  <p className="font-medium mb-3 text-sm">What's included:</p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex gap-2 items-start text-sm">
                        <span className={cn(
                          "rounded-full p-1 shrink-0 mt-0.5",
                          plan.isPopular ? "bg-primary/10 text-primary" : "bg-green-500/10 text-green-500"
                        )}>
                          <Check className="h-3 w-3" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {plan.notIncluded && (
                  <div>
                    <p className="font-medium mb-3 text-sm text-muted-foreground">Not included:</p>
                    <ul className="space-y-2.5">
                      {plan.notIncluded.map((feature, index) => (
                        <li key={index} className="flex gap-2 items-start text-sm text-muted-foreground">
                          <span className="rounded-full p-1 bg-secondary/20 shrink-0 mt-0.5">
                            <X className="h-3 w-3" />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="pt-6 mt-auto">
              {isCurrentPlan(plan.id) ? (
                <div className="w-full p-2 border border-primary/20 bg-primary/5 text-primary font-medium rounded-lg text-center">
                  Current Plan
                </div>
              ) : (
                <RazorpayCheckout
                  planSku={plan.id}
                  planName={plan.name}
                  planPrice={plan.price}
                  durationMonths={plan.durationMonths}
                  buttonText={plan.isPopular ? `Get ${plan.name} Now` : `Subscribe to ${plan.name}`}
                  className={cn(
                    "w-full",
                    plan.isPopular 
                      ? "bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white" 
                      : ""
                  )}
                  onSuccess={handleSuccess}
                />
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
          <div className="text-center md:text-left">
            <h4 className="font-medium mb-1">Need a custom plan for your team?</h4>
            <p className="text-sm text-muted-foreground">
              Contact us for custom pricing and enterprise features.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
          >
            Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground space-y-1">
        <p>
          All plans include a 7-day money-back guarantee.
        </p>
        <p>
          Payments are securely processed by Razorpay.
        </p>
      </div>
    </div>
  );
};

export default SubscriptionPlans; 