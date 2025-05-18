import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      
      <div className="container relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            One Platform, <br />
            <span className="text-gradient">Endless Possibilities</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            From automation to collaboration, our solution empowers your team to work smarter, 
            not harder. Discover the endless possibilities waiting for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 rounded-full bg-primary text-white hover:bg-primary/90"
                >
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <a href="#pricing">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 rounded-full bg-primary text-white hover:bg-primary/90"
                >
                  Get Started Now
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom curved section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-background" style={{
        borderTopLeftRadius: "50% 100%",
        borderTopRightRadius: "50% 100%"
      }}></div>
      
      {/* Backed by companies section */}
      <div className="container relative z-10 mt-24">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold">Trusted by 2000+ Customers</h3>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-12">
          {['Notion', 'Slack', 'Figma', 'Shopify', 'Asana', 'HP', 'Netflix', 'Chrome'].map((brand) => (
            <div key={brand} className="opacity-70 hover:opacity-100 transition-opacity">
              <span className="text-xl font-medium">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
