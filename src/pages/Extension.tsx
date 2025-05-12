
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download } from 'lucide-react';

const Extension = () => {
  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-semibold mb-8">Download Our Browser Extension</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-secondary/30 border-secondary/60">
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">OneAccess - Premium Access Extension</h2>
                <p className="text-muted-foreground">
                  Unlock & enjoy premium tools seamlessly. Our browser extension gives you immediate 
                  access to all premium tools included in your membership.
                </p>
              </div>
              
              <div className="flex justify-start">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Download Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-secondary/30 border-secondary/60 overflow-hidden">
              <div className="aspect-video bg-black">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <p>Step 1: How to install extension? (Video)</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="font-medium">Step 1: How to install extension?</p>
                <p className="text-sm text-muted-foreground">Duration: 51 seconds</p>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/30 border-secondary/60 overflow-hidden">
              <div className="aspect-video bg-black">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <p>Step 2: How to access tools? (Video)</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="font-medium">Step 2: How to access tools?</p>
                <p className="text-sm text-muted-foreground">Duration: 15 seconds</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">Extension Installation Instructions</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Chrome / Edge Installation</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Download the extension using the button above</li>
                <li>Open Chrome/Edge and go to Extensions (chrome://extensions/ or edge://extensions/)</li>
                <li>Enable "Developer mode" using the toggle in the top-right corner</li>
                <li>Drag and drop the downloaded file into the extensions page</li>
                <li>Approve any prompts that appear</li>
              </ol>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Firefox Installation</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Download the Firefox version of the extension</li>
                <li>Open Firefox and navigate to Add-ons (about:addons)</li>
                <li>Click the gear icon and select "Install Add-on From File"</li>
                <li>Select the downloaded file and follow the prompts</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Extension;
