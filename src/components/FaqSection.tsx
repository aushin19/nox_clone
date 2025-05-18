import React from 'react';
import { faqs } from "@/data/faqs";
import { PlusIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const FaqSection = () => {
  return (
    <section id="faq" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute right-0 top-0 rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.03)_0,hsla(0,0%,55%,.01)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="w-[50rem] h-[80rem] absolute left-0 bottom-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.03)_0,hsla(0,0%,55%,.01)_50%,hsla(0,0%,45%,0)_80%)]" />
      </div>

      <div className="container relative z-10">
        <AnimatedGroup preset="fade" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            Everything you need to know about our platform and services
          </p>
        </AnimatedGroup>

        <div className="max-w-4xl mx-auto">
          <AnimatedGroup 
            preset="fade" 
            className="bg-gradient-to-b from-muted/20 to-transparent rounded-3xl backdrop-blur-sm p-2 sm:p-6 border border-muted/30 relative"
          >
            {/* Decorative highlight */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-40" />
            
            <Accordion type="single" collapsible className="space-y-5">
              {faqs.map((faq, index) => (
                <FaqItem 
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  value={`item-${index}`}
                />
              ))}
            </Accordion>
          </AnimatedGroup>
        </div>

        {/* Contact support prompt */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            Didn't find what you were looking for?{" "}
            <a href="/support" className="text-primary hover:underline font-medium">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
  value: string;
}

const FaqItem = ({ question, answer, value }: FaqItemProps) => {
  return (
    <AccordionItem 
      value={value} 
      className="group border-0 bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <AccordionTrigger 
        className={cn(
          "px-6 py-5 text-lg font-medium",
          "group-hover:text-primary",
          "flex items-center justify-between",
          "transition-all duration-300",
          "hover:no-underline",
          "data-[state=open]:bg-muted/30",
          "[&>svg]:hidden"
        )}
      >
        <span>{question}</span>
        <div className="relative h-6 w-6 shrink-0 transition-transform duration-300">
          <PlusIcon className="h-5 w-5 absolute inset-0 m-auto transition-opacity group-data-[state=open]:opacity-0" />
          <MinusIcon className="h-5 w-5 absolute inset-0 m-auto opacity-0 transition-opacity group-data-[state=open]:opacity-100" />
        </div>
      </AccordionTrigger>
      <AccordionContent className="bg-muted/20 text-muted-foreground text-base px-6 pt-2 pb-6 leading-relaxed">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FaqSection; 