
import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-20 md:pt-32 md:pb-28 bg-gradient-to-b from-background to-secondary/10">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 text-center md:text-left">
            <div className="relative mb-2">
              <div className="hidden md:block absolute -top-10 -left-8 w-16 h-16 bg-primary/10 rounded-full blur-xl"></div>
              <div className="hidden md:block absolute top-8 -right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
            </div>
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
              <Button size="lg" variant="outline" className="text-lg border-white/10 bg-white/5 hover:bg-white/10">
                Explore Tools
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-xl blur-xl"></div>
              <div className="bg-gradient-to-br from-white/5 to-white/2 p-1 rounded-2xl border border-white/10 relative">
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                    alt="People using OneTools.io"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="hidden md:block absolute -bottom-8 -right-8 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
