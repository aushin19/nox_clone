
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { benefits } from "@/data/benefits";
import { Clock, Zap, MessageSquare, Globe } from "lucide-react";

const BenefitsSection = () => {
  // Function to render the appropriate icon
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'clock':
        return <div className="bg-yellow-500/20 p-3 rounded-lg"><Clock className="h-8 w-8 text-yellow-500" /></div>;
      case 'lightning-bolt':
        return <div className="bg-blue-500/20 p-3 rounded-lg"><Zap className="h-8 w-8 text-blue-500" /></div>;
      case 'whatsapp':
        return <div className="bg-purple-500/20 p-3 rounded-lg"><MessageSquare className="h-8 w-8 text-purple-500" /></div>;
      case 'globe':
        return <div className="bg-green-500/20 p-3 rounded-lg"><Globe className="h-8 w-8 text-green-500" /></div>;
      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why OneTools.io?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We make accessing premium tools simple, affordable, and reliable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="glass-card border-secondary/30 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="mb-4">{renderIcon(benefit.icon)}</div>
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
