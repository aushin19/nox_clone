
import React from 'react';
import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card mt-16 pt-12 pb-6 border-t border-secondary/60">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">OneTools.io</h3>
            <p className="text-muted-foreground">One membership for 50+ premium tools to boost your creativity, productivity, and knowledge.</p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Follow Us On Social Channels</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Instagram size={18} />
                <span>Instagram</span>
                <span className="text-sm text-muted-foreground">3.4k Followers</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Facebook size={18} />
                <span>Facebook</span>
                <span className="text-sm text-muted-foreground">1.8k Likes</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Our Support Channels</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">WhatsApp:</span>
                <a href="#" className="text-primary hover:underline">Chat Now</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Email:</span>
                <a href="mailto:support@onetools.io" className="text-primary hover:underline">support@onetools.io</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary/60 pt-6 flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 OneTools.io. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
