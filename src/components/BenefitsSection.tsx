
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { benefits } from "@/data/benefits";
import { Clock, LightningBolt, Whatsapp, Globe } from "lucide-react";

const BenefitsSection = () => {
  // Function to render the appropriate icon
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'clock':
        return <Clock className="h-10 w-10 text-primary" />;
      case 'lightning-bolt':
        return <LightningBolt className="h-10 w-10 text-primary" />;
      case 'whatsapp':
        return <Whatsapp className="h-10 w-10 text-primary" />;
      case 'globe':
        return <Globe className="h-10 w-10 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why OneTools.io?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We make accessing premium tools simple, affordable, and reliable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="card-hover border-secondary/60">
              <CardHeader className="pb-2">
                <div className="mb-2">{renderIcon(benefit.icon)}</div>
                <h3 className="text-xl font-medium">{benefit.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
