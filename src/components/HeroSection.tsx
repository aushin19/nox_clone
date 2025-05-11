
import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="pt-16 pb-20 md:pt-20 md:pb-24">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-gradient">One Membership</span> for <br/>
              50+ Premium Tools
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
              Access all the tools you need for design, writing, learning, marketing, 
              and more—at a fraction of the individual subscription costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="text-lg">GET STARTED</Button>
              <Button size="lg" variant="outline" className="text-lg">
                Explore Tools
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-1 rounded-2xl">
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="People using OneTools.io"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
