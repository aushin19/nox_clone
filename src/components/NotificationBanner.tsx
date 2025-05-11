
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface NotificationBannerProps {
  message: string;
  linkText?: string;
  linkUrl?: string;
}

const NotificationBanner = ({ 
  message, 
  linkText = "Learn More", 
  linkUrl = "#" 
}: NotificationBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-secondary py-2 px-4 text-center relative">
      <div className="container flex items-center justify-center gap-2">
        <span className="inline-flex items-center">
          <span className="text-yellow-400 mr-2">✨</span>
          {message}
        </span>
        {linkText && linkUrl && (
          <a href={linkUrl} className="font-medium hover:underline inline-flex items-center">
            {linkText}
            <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default NotificationBanner;
