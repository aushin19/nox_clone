
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Search } from 'lucide-react';

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
      category: "AI & Content Writing" 
    },
    { 
      id: 2, 
      name: "Midjourney", 
      logo: "https://placeholder.svg", 
      category: "AI & Content Writing" 
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
      category: "Streaming & Entertainment" 
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
    // Add more mock tools as needed
  ]
};

const ToolsLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter tools based on search
  const filteredTools = toolsData.tools.filter(
    tool => tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group tools by category
  const groupedTools = toolsData.categories.map(category => ({
    category,
    tools: filteredTools.filter(tool => tool.category === category)
  }));

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <Alert className="mb-6 bg-secondary/30 border-primary/30">
          <AlertDescription className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1">
              <strong>To access the tools, please download our extension.</strong>
              <div className="text-sm text-muted-foreground mt-1">
                Install our browser extension for seamless tool access
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="bg-primary text-white hover:bg-primary/90">
                <Download className="mr-2 h-4 w-4" />
                Download Now
              </Button>
              <Button variant="outline" className="border-secondary bg-secondary/20 hover:bg-secondary/40">
                Watch Tutorial
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        <h1 className="text-3xl font-semibold mb-2">Tools Library</h1>
        <p className="text-muted-foreground mb-8">
          Browse through all the tools available and access them instantly.
        </p>
        
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input 
            placeholder="Search for a tool..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-10">
          {groupedTools.map(group => (
            group.tools.length > 0 && (
              <div key={group.category} className="space-y-4">
                <h2 className="text-xl font-medium border-b border-secondary/60 pb-2">{group.category}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                  {group.tools.map(tool => (
                    <div key={tool.id} className="bg-secondary/30 border border-secondary/60 rounded-lg p-4 flex flex-col items-center text-center hover:border-primary/40 transition-all">
                      <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-3">
                        <img src={tool.logo} alt={tool.name} className="w-8 h-8" />
                      </div>
                      <h3 className="text-sm font-medium mb-2">{tool.name}</h3>
                      <Button size="sm" className="mt-2 w-full text-xs">Get Access</Button>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ToolsLibrary;
