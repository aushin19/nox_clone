import React, { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle } from "lucide-react";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const TourSection = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoId = "oRrQw_GM7F0";
  
  const handlePlayVideo = () => {
    setVideoPlaying(true);
  };

  return (
    <section id="tour" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="w-[50rem] h-[80rem] -translate-y-[200px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.03)_0,hsla(0,0%,55%,.01)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="w-[35rem] h-[80rem] absolute right-0 bottom-0 rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.03)_0,hsla(0,0%,55%,.01)_50%,hsla(0,0%,45%,0)_80%)]" />
      </div>

      <div className="container relative z-10">
        <AnimatedGroup preset="fade" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Take a <span className="text-primary">Quick Tour</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            Watch how easy it is to explore and use the OneTools.io user panel
          </p>
        </AnimatedGroup>

        <AnimatedGroup preset="fade" className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-muted/30 bg-gradient-to-b from-muted/20 to-transparent backdrop-blur-sm shadow-xl relative">
            {/* Decorative highlight */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-40" />
            
            <div className="relative">
              <AspectRatio ratio={16/9}>
                {videoPlaying ? (
                  <iframe 
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title="OneTools.io Tour"
                    className="absolute inset-0 w-full h-full border-0 z-20"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="w-full h-full bg-black/70 flex items-center justify-center overflow-hidden">
                    {/* Video thumbnail - YouTube thumbnail */}
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    <img 
                      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                      alt="Video thumbnail" 
                      className="absolute inset-0 w-full h-full object-cover opacity-70 transition-all duration-700 hover:scale-105"
                      onError={(e) => {
                        // Fallback to medium quality thumbnail if maxresdefault is not available
                        e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                      }}
                    />
                    
                    {/* Play button overlay */}
                    <button 
                      onClick={handlePlayVideo}
                      className="group relative z-20 transform transition-all duration-300 hover:scale-110"
                    >
                      <div className="absolute -inset-8 bg-primary/20 rounded-full blur opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <PlayCircle className="w-20 h-20 text-white relative z-20 group-hover:text-primary transition-colors duration-300" />
                    </button>
                  </div>
                )}
              </AspectRatio>
            </div>
            
            {/* Video caption */}
            <div className="p-6 relative">
              <h3 className="text-xl font-semibold mb-2">Get Started in Minutes</h3>
              <p className="text-muted-foreground">Learn how to navigate, discover tools, and make the most of your membership.</p>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  variant="outline" 
                  className="group bg-background/50 hover:bg-background transition-all duration-300"
                >
                  <span>Watch More Tutorials</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedGroup>
      </div>
    </section>
  );
};

export default TourSection; 