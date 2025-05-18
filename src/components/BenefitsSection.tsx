import React from 'react';
import { benefits } from "@/data/benefits";
import { Clock, Zap, MessageSquare, Globe } from "lucide-react";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { cn } from "@/lib/utils";

const BenefitsSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.03)_0,hsla(0,0%,55%,.01)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="w-[50rem] h-[80rem] absolute right-0 bottom-0 rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.03)_0,hsla(0,0%,55%,.01)_50%,hsla(0,0%,45%,0)_80%)]" />
      </div>
      
      <div className="container relative z-10">
        <AnimatedGroup preset="fade" className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Why <span className="text-primary">OneTools.io</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            We make accessing premium tools simple, affordable, and reliable.
          </p>
        </AnimatedGroup>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              title={benefit.title}
              description={benefit.description}
              iconType={benefit.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface BenefitCardProps {
  title: string;
  description: string;
  iconType: string;
  index: number;
}

const BenefitCard = ({ title, description, iconType, index }: BenefitCardProps) => {
  // Function to render the appropriate icon
  const renderIcon = () => {
    switch (iconType) {
      case 'clock':
        return <Clock className="h-6 w-6" />;
      case 'lightning-bolt':
        return <Zap className="h-6 w-6" />;
      case 'whatsapp':
        return <MessageSquare className="h-6 w-6" />;
      case 'globe':
        return <Globe className="h-6 w-6" />;
      default:
        return null;
    }
  };

  // Get appropriate color based on icon type
  const getIconColor = () => {
    switch (iconType) {
      case 'clock': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'lightning-bolt': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'whatsapp': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'globe': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <AnimatedGroup
      preset="fade"
      className={cn(
        "group bg-gradient-to-b from-background to-muted/20 backdrop-blur-sm",
        "border rounded-2xl overflow-hidden transition-all duration-500",
        "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30",
        "p-6 h-full"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={cn(
        "p-3 rounded-xl mb-4 inline-flex items-center justify-center",
        "border backdrop-blur-sm",
        getIconColor()
      )}>
        {renderIcon()}
      </div>
      
      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </AnimatedGroup>
  );
};

export default BenefitsSection; 