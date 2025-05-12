
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Wrench } from 'lucide-react';

// Mock tools data
const tools = [
  { id: 1, name: "ChatGPT Plus" },
  { id: 2, name: "Midjourney" },
  { id: 3, name: "Adobe Creative Cloud" },
  { id: 4, name: "Netflix" },
  { id: 5, name: "Envato Elements" },
  { id: 6, name: "Coursera Plus" },
];

// Mock recent fixes
const recentFixes = [
  {
    id: 1,
    toolName: "Netflix",
    fixedDate: "2023-05-10T14:30:00",
    status: "fixed"
  },
  {
    id: 2,
    toolName: "Midjourney",
    fixedDate: "2023-05-08T09:15:00",
    status: "fixed"
  },
  {
    id: 3,
    toolName: "ChatGPT Plus",
    fixedDate: "2023-05-05T16:45:00",
    status: "fixed"
  }
];

const FixTool = () => {
  const [selectedTool, setSelectedTool] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  
  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you'd send the form data to your API
    console.log('Fix report submitted:', { selectedTool, issueDescription });
    setSelectedTool("");
    setIssueDescription("");
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-semibold mb-8">Fix a Tool</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-secondary/30 border-secondary/60">
            <CardHeader>
              <CardTitle>Report an Issue</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search and select a tool</label>
                  <Select value={selectedTool} onValueChange={setSelectedTool}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tool" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tools</SelectLabel>
                        {tools.map((tool) => (
                          <SelectItem key={tool.id} value={String(tool.id)}>
                            {tool.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Describe the issue</label>
                  <Textarea
                    placeholder="Please describe the issue you're experiencing..."
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    rows={5}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-white"
                  disabled={!selectedTool || !issueDescription}
                >
                  Submit Issue
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-8">
            <Card className="bg-secondary/30 border-secondary/60">
              <CardHeader>
                <CardTitle>Recent fixes reported by you</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-6">
                  No recent fixes yet.
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/30 border-secondary/60">
              <CardHeader>
                <CardTitle>All recent fixes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFixes.map((fix) => (
                    <div 
                      key={fix.id} 
                      className="flex items-start p-4 border border-secondary/60 rounded-lg bg-background/30"
                    >
                      <div className="bg-green-500/20 p-2 rounded-md mr-3">
                        <Wrench className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p>
                          <span className="font-medium">{fix.toolName}</span>
                          <span className="text-green-500"> is just fixed!</span>
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Please go to Tools Library and activate the tool again.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Fixed on {formatDate(fix.fixedDate)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FixTool;
