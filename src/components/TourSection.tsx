
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";

const TourSection = () => {
  return (
    <section id="tour" className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Take a Quick Tour</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how easy it is to explore and use the OneTools.io user panel
          </p>
        </div>

        <Card className="mx-auto max-w-4xl overflow-hidden border-secondary/60">
          <AspectRatio ratio={16/9}>
            <div className="w-full h-full bg-black flex items-center justify-center">
              <p className="text-muted-foreground">Video tour would load here</p>
              {/* In a real implementation, you'd use an iframe for YouTube/Vimeo */}
              {/* <iframe
                src="https://www.youtube.com/embed/your-video-id"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe> */}
            </div>
          </AspectRatio>
        </Card>
      </div>
    </section>
  );
};

export default TourSection;
