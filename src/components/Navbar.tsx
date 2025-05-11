
import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="border-b border-secondary/60 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gradient">OneTools.io</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#tools" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Tools
            </a>
            <a href="#tour" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Tour
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex">Log In</Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
