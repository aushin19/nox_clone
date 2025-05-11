
import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      
      {/* Blue pill notification */}
      <div className="relative z-10 max-w-md mx-auto mb-8">
        <div className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full flex items-center justify-center">
          <div className="bg-blue-500 rounded-full p-1 mr-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>Try free for 7 days with no bills.</span>
        </div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-gradient">Modern marketing tools</span> <br />
              for your business
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Connect the dots between customer needs and your product delivery workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-lg px-6">7-Day Free Trial</Button>
              <Button size="lg" variant="outline" className="text-lg border-white/10 bg-white/5 hover:bg-white/10">
                Learn More
                <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-6 right-6 w-48 h-48 bg-primary/10 rounded-full blur-xl"></div>
            
            {/* Stats cards */}
            <div className="relative grid grid-cols-2 gap-6">
              {/* Business Growth Card */}
              <div className="col-span-2 glass-card p-4 rounded-xl">
                <h3 className="font-medium text-sm mb-2">Business Growth</h3>
                <div className="h-32 flex items-end space-x-3 pt-4">
                  {[60, 80, 40, 70, 50, 90, 60].map((height, i) => (
                    <div key={i} className="w-full">
                      <div 
                        className="bg-blue-500 rounded-t-sm" 
                        style={{height: `${height}%`}}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Increase Rate Card */}
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-blue-500">+88%</span>
                  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Increase Rate</p>
              </div>
              
              {/* Stats Card */}
              <div className="glass-card p-4 rounded-xl">
                <div className="text-center">
                  <div className="bg-blue-500/20 inline-flex items-center justify-center p-2 rounded-full">
                    <svg className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Stats</p>
                  <p className="text-lg font-bold">+88%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Logo Bar */}
      <div className="container mt-16">
        <div className="border-t border-white/10 pt-10">
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12 opacity-70">
            {['Discord', 'Monday.com', 'NCR', 'VICE', 'Dropbox', 'Rakuten'].map((brand) => (
              <div key={brand} className="flex items-center">
                <span className="text-lg font-medium text-muted-foreground">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
