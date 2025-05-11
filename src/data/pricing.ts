
export type PricingPlan = {
  name: string;
  price: string;
  billing: string;
  description: string;
  badge?: string;
  savings?: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Monthly",
    price: "₹449",
    billing: "per month",
    description: "Perfect for trying things out."
  },
  {
    name: "Semi-Annual",
    price: "₹249",
    billing: "per month",
    description: "Most Popular choice for users.",
    badge: "Most Popular",
    savings: "Save 45%"
  },
  {
    name: "Yearly",
    price: "₹199",
    billing: "per month",
    description: "Best value for committed users.",
    badge: "Super Saving",
    savings: "Save 55%"
  }
];

export const features = [
  "50+ Premium Tools Access",
  "Free Future Updates",
  "24/7 Dedicated Support",
  "Instant Activation"
];
