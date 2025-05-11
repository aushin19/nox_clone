
import React from 'react';
import { categories, tools } from "@/data/tools";
import { Card } from "@/components/ui/card";

const ToolShowcase = () => {
  return (
    <section id="tools" className="py-16 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our 50+ Premium Tools</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One membership gives you immediate access to all these professional tools
            and services, with new additions every month.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-xl font-medium mb-4 border-b border-secondary/60 pb-2">{category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {tools
                  .filter(tool => tool.category === category)
                  .map(tool => (
                    <Card key={tool.name} className="flex flex-col items-center p-4 card-hover">
                      <div className="bg-background rounded-full w-12 h-12 flex items-center justify-center mb-3">
                        <img src={tool.logo} alt={tool.name} className="w-8 h-8" />
                      </div>
                      <p className="text-sm font-medium text-center">{tool.name}</p>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolShowcase;
