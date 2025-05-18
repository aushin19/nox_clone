import React from 'react';
import { updates } from "@/data/updates";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const UpdatesSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.03)_0,hsla(0,0%,55%,.01)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="w-[50rem] h-[80rem] absolute right-0 bottom-0 rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.03)_0,hsla(0,0%,55%,.01)_50%,hsla(0,0%,45%,0)_80%)]" />
      </div>
      
      <div className="container relative z-10">
        <AnimatedGroup preset="fade" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Latest <span className="text-primary">Updates</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            We're constantly adding new tools and improving our platform.
            Stay up to date with our latest additions.
          </p>
        </AnimatedGroup>

        <div className="max-w-3xl mx-auto">
          <AnimatedGroup 
            preset="fade" 
            className="bg-gradient-to-b from-muted/20 to-transparent rounded-3xl backdrop-blur-sm p-6 border border-muted/30 relative"
          >
            {/* Decorative highlight */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-40" />
            
            <div className="relative space-y-6">
              {updates.map((update, index) => (
                <UpdateItem 
                  key={index}
                  date={update.date}
                  content={update.content}
                  index={index}
                />
              ))}
              
              <AnimatedGroup preset="fade" className="text-center pt-4 mt-8 border-t border-muted/40">
                <Button 
                  variant="outline" 
                  className="group bg-background/50 hover:bg-background transition-all duration-300"
                >
                  <span>View All Updates</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </AnimatedGroup>
            </div>
          </AnimatedGroup>
        </div>
      </div>
    </section>
  );
};

interface UpdateItemProps {
  date: string;
  content: string;
  index: number;
}

const UpdateItem = ({ date, content, index }: UpdateItemProps) => {
  return (
    <AnimatedGroup 
      preset="fade"
      className="flex items-start gap-4 transition-all duration-300 hover:bg-muted/20 p-3 rounded-xl"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="bg-primary/10 border border-primary/20 text-primary rounded-full p-2 mt-1">
        <Clock className="h-4 w-4" />
      </div>
      
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
          <span className="text-sm font-medium text-primary">{date}</span>
          <span className="text-base text-foreground">{content}</span>
        </div>
      </div>
    </AnimatedGroup>
  );
};

export default UpdatesSection; 