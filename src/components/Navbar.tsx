
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown } from "lucide-react";

interface NavbarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

const Navbar = ({ onLoginClick, onRegisterClick }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-secondary/60 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">OneTools.io</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium text-foreground transition-colors">
              Home
            </a>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Products
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <a href="#tools">AI & Content Writing</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#tools">Asset Platforms</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#tools">Graphic & Video Creation</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <a href="#tour">Product Tour</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#pricing">Pricing</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="hidden sm:flex border-secondary bg-background/60 hover:bg-secondary/60"
            onClick={onLoginClick}
          >
            Log in
          </Button>
          <Button 
            className="hidden sm:flex"
            onClick={onRegisterClick}
          >
            Register
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-secondary/60 bg-background/95 backdrop-blur-sm">
          <div className="container py-3 space-y-3">
            <a href="/" className="block py-2 text-sm font-medium">Home</a>
            <a href="#tools" className="block py-2 text-sm font-medium">Products</a>
            <a href="#tour" className="block py-2 text-sm font-medium">Features</a>
            <a href="#pricing" className="block py-2 text-sm font-medium">Pricing</a>
            <a href="#faq" className="block py-2 text-sm font-medium">Resources</a>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="w-1/2" onClick={onLoginClick}>Log in</Button>
              <Button className="w-1/2" onClick={onRegisterClick}>Register</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
