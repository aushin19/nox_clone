import React, { useState } from 'react';
import { categories, tools } from "@/data/tools";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { cn } from "@/lib/utils";
import { ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ToolShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter tools based on selected category and search query
  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === "" || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get unique categories from tools data
  const uniqueCategories = [...new Set(tools.map(tool => tool.category))].filter(Boolean);

  return (
    <section id="tools" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="w-[50rem] h-[80rem] -translate-y-[180px] absolute right-0 top-0 rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.03)_0,hsla(0,0%,55%,.01)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="w-[35rem] h-[80rem] absolute left-0 bottom-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.03)_0,hsla(0,0%,55%,.01)_50%,hsla(0,0%,45%,0)_80%)]" />
      </div>
      
      <div className="container relative z-10">
        <AnimatedGroup preset="fade" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Explore Our <span className="text-primary">Premium Tools</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            One membership gives you immediate access to all these professional tools
            and services, with new additions every month.
          </p>
        </AnimatedGroup>

        {/* Tools Filter Section */}
        <AnimatedGroup preset="fade" className="mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("")}
                className="rounded-full"
              >
                All
              </Button>
              
              {uniqueCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
            
            {/* Search Box */}
            <div className="relative w-full sm:w-64 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tools..."
                className="pl-9 bg-background border-muted"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </AnimatedGroup>

        {/* Tools Grid */}
        <div className="max-w-6xl mx-auto">
          <AnimatedGroup
            preset="fade"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          >
            {filteredTools.map((tool, index) => (
              <ToolCard
                key={tool.name}
                name={tool.name}
                logo={tool.logo}
                index={index}
                sizeClassName={tool.sizeClassName}
              />
            ))}
          </AnimatedGroup>
          
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tools found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-14">
          <Button
            variant="outline"
            className="group bg-background/50 hover:bg-background/80"
          >
            <span>View All Tools</span>
            <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};

interface ToolCardProps {
  name: string;
  logo: string;
  index: number;
  sizeClassName?: string;
}

const ToolCard = ({ name, logo, index, sizeClassName }: ToolCardProps) => {
  return (
    <AnimatedGroup
      preset="fade"
      className={cn(
        "group relative bg-gradient-to-b from-background to-muted/20 backdrop-blur-sm",
        "border rounded-2xl overflow-hidden transition-all duration-500",
        "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30",
        "p-4 flex flex-col items-center"
      )}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center justify-center py-4 h-24">
        <img 
          src={logo} 
          alt={name} 
          className={cn(
            "transition-transform duration-500 group-hover:scale-110",
            sizeClassName || "w-12 h-12"
          )} 
        />
      </div>
      
      <div className="mt-auto">
        <p className="text-center font-medium group-hover:text-primary transition-colors duration-300">
          {name}
        </p>
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </AnimatedGroup>
  );
};

export default ToolShowcase; 