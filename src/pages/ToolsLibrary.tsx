import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Download, 
  Search, 
  Folder, 
  ExternalLink, 
  BookOpen, 
  Star,
  Filter,
  ChevronRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock tool data
const toolsData = {
  categories: [
    "AI & Content Writing",
    "Streaming & Entertainment",
    "Asset Platforms",
    "Graphic & Video Creation",
    "Learning Platforms",
    "SEO & Marketing Tools",
    "Other Productivity Apps"
  ],
  tools: [
    { 
      id: 1, 
      name: "ChatGPT Plus", 
      logo: "https://placeholder.svg", 
      category: "AI & Content Writing",
      isPopular: true
    },
    { 
      id: 2, 
      name: "Midjourney", 
      logo: "https://placeholder.svg", 
      category: "AI & Content Writing",
      isNew: true 
    },
    { 
      id: 3, 
      name: "Adobe Creative Cloud", 
      logo: "https://placeholder.svg", 
      category: "Graphic & Video Creation" 
    },
    { 
      id: 4, 
      name: "Netflix", 
      logo: "https://placeholder.svg", 
      category: "Streaming & Entertainment",
      isPopular: true
    },
    { 
      id: 5, 
      name: "Envato Elements", 
      logo: "https://placeholder.svg", 
      category: "Asset Platforms" 
    },
    { 
      id: 6, 
      name: "Coursera Plus", 
      logo: "https://placeholder.svg", 
      category: "Learning Platforms" 
    },
    { 
      id: 7, 
      name: "Ahrefs", 
      logo: "https://placeholder.svg", 
      category: "SEO & Marketing Tools",
      isNew: true
    },
    { 
      id: 8, 
      name: "Notion", 
      logo: "https://placeholder.svg", 
      category: "Other Productivity Apps" 
    },
  ]
};

const ToolsLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter tools based on search and selected category
  const filteredTools = toolsData.tools.filter(
    tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? tool.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    }
  );
  
  // Group tools by category
  const groupedTools = toolsData.categories.map(category => ({
    category,
    tools: filteredTools.filter(tool => tool.category === category)
  })).filter(group => group.tools.length > 0);

  return (
    <DashboardLayout>
      <div className="pb-8">
        {/* Header section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent mb-8 rounded-2xl">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-3">Tools Library</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-6">
              Browse through all the tools available and access them instantly with our extension.
            </p>
            
            <Alert className="border border-primary/20 bg-primary/5 mb-4">
              <AlertDescription className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <div className="font-medium mb-1">To access the tools, install our browser extension</div>
                  <div className="text-sm text-muted-foreground">
                    Access all tools with one click directly from your browser
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    <Download className="mr-2 h-4 w-4" />
                    Install Extension
                  </Button>
                  <Button variant="outline">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Tutorial
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Search */}
              <div className="relative">
                <div className="relative flex items-center">
                  <Search className="absolute left-3 text-muted-foreground h-5 w-5" />
                  <Input 
                    placeholder="Search for tools..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 h-12 bg-background border-primary/20 focus-visible:ring-primary/30 w-full rounded-lg"
                  />
                </div>
                {searchTerm && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearchTerm('')}
                  >
                    Clear
                  </Button>
                )}
              </div>
              
              {/* Categories filter */}
              <div>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                    className="rounded-full"
                  >
                    All
                  </Button>
                  {toolsData.categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      className="rounded-full"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tools sections */}
        <div className="space-y-8">
          {groupedTools.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-secondary/10 inline-flex p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No tools found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              {searchTerm && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            groupedTools.map(group => (
              <div key={group.category}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Folder className="h-5 w-5 text-primary" />
                    {group.category}
                    <Badge variant="outline" className="ml-2 font-normal bg-secondary/10">
                      {group.tools.length}
                    </Badge>
                  </h2>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {group.tools.map(tool => (
                    <Card key={tool.id} className="group relative border border-secondary/20 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 overflow-hidden">
                      <div className="relative px-4 py-5 flex flex-col items-center text-center h-full">
                        {/* Logo */}
                        <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                          <img src={tool.logo} alt={tool.name} className="w-8 h-8 opacity-80 group-hover:opacity-100" />
                        </div>
                        
                        {/* Name */}
                        <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">{tool.name}</h3>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 justify-center mb-3">
                          {tool.isNew && (
                            <Badge className="text-[10px] bg-blue-500/10 text-blue-500 border-blue-500/20">
                              NEW
                            </Badge>
                          )}
                          {tool.isPopular && (
                            <Badge className="text-[10px] bg-amber-500/10 text-amber-500 border-amber-500/20">
                              <Star className="mr-1 h-2 w-2" />
                              POPULAR
                            </Badge>
                          )}
                        </div>
                        
                        {/* Button */}
                        <Button size="sm" variant="outline" className="mt-auto w-full text-xs group-hover:bg-primary/10 group-hover:border-primary/20">
                          <ExternalLink className="mr-1 h-3 w-3" />
                          Access Tool
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ToolsLibrary;
