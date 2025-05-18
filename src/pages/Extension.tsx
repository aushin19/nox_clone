import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Download,
  Monitor,
  CheckCircle,
  ArrowRight,
  Zap,
  Lock,
  BarChart,
  ExternalLink,
  Cpu,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Extension = () => {
  // Mock extension versions
  const versions = {
    chrome: '1.2.3',
    firefox: '1.2.2',
    edge: '1.2.3',
    safari: '1.2.1'
  };

  // Extension features
  const features = [
    {
      title: "One-Click Access",
      description: "Access all premium tools with just a single click, directly from your browser.",
      icon: Zap
    },
    {
      title: "Secure Authentication",
      description: "Your login credentials are securely stored and automatically applied when needed.",
      icon: Lock
    },
    {
      title: "Usage Analytics",
      description: "Track how you use different tools and optimize your workflow.",
      icon: BarChart
    },
    {
      title: "Performance Optimized",
      description: "Lightweight extension with minimal resource usage for seamless browsing.",
      icon: Cpu
    }
  ];

  return (
    <DashboardLayout>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-transparent mb-8 rounded-2xl">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative p-8 md:p-12">
          <div className="max-w-4xl">
            <Badge className="mb-4">Browser Extension</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Unlock Premium Tools With Our Extension</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Our browser extension seamlessly integrates with your workflow, providing instant access to all premium tools without the hassle of switching tabs or logging in repeatedly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                <Download className="mr-2 h-5 w-5" />
                Download for Chrome
              </Button>
              <Button size="lg" variant="outline">
                <Globe className="mr-2 h-5 w-5" />
                See All Browsers
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-border/40">
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Regular Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Lightweight</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Browser Downloads Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Download for Your Browser</h2>
            <p className="text-muted-foreground">Choose your preferred browser to get started</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Chrome */}
          <Card className="border border-border hover:border-primary/50 hover:shadow-md transition-all group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#4285F4]"></div>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center border">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4285F4]"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>
                </div>
                <div>
                  <CardTitle>Google Chrome</CardTitle>
                  <CardDescription>Version {versions.chrome}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full group-hover:bg-[#4285F4] group-hover:text-white transition-colors">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </CardContent>
          </Card>

          {/* Firefox */}
          <Card className="border border-border hover:border-primary/50 hover:shadow-md transition-all group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FF5722]"></div>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center border">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5722]"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="12" x2="12" y2="12.01"/></svg>
                </div>
                <div>
                  <CardTitle>Firefox</CardTitle>
                  <CardDescription>Version {versions.firefox}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full group-hover:bg-[#FF5722] group-hover:text-white transition-colors">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </CardContent>
          </Card>

          {/* Edge */}
          <Card className="border border-border hover:border-primary/50 hover:shadow-md transition-all group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#0078D7]"></div>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center border">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0078D7]"><path d="M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0Z"/><path d="M3.6 9h16.8"/><path d="M3.6 15h16.8"/></svg>
                </div>
                <div>
                  <CardTitle>Microsoft Edge</CardTitle>
                  <CardDescription>Version {versions.edge}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full group-hover:bg-[#0078D7] group-hover:text-white transition-colors">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </CardContent>
          </Card>

          {/* Safari */}
          <Card className="border border-border hover:border-primary/50 hover:shadow-md transition-all group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#007AFF]"></div>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center border">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#007AFF]"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>
                </div>
                <div>
                  <CardTitle>Safari</CardTitle>
                  <CardDescription>Version {versions.safari}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full group-hover:bg-[#007AFF] group-hover:text-white transition-colors">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Installation Guide */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Easy Installation Guide</h2>
            <p className="text-muted-foreground">Follow the simple steps below to install the extension</p>
          </div>
        </div>

        <Tabs defaultValue="chrome" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="chrome">Chrome</TabsTrigger>
            <TabsTrigger value="firefox">Firefox</TabsTrigger>
            <TabsTrigger value="edge">Edge</TabsTrigger>
            <TabsTrigger value="safari">Safari</TabsTrigger>
          </TabsList>

          <TabsContent value="chrome" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Download the extension</h3>
                  <p className="text-muted-foreground mb-4">Click the download button above to get the extension file for Chrome.</p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Monitor className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Open Chrome Extensions</h3>
                  <p className="text-muted-foreground mb-4">Go to Chrome menu → More Tools → Extensions or navigate to chrome://extensions/</p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Monitor className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Install the extension</h3>
                  <p className="text-muted-foreground mb-4">Drag and drop the downloaded file onto the Extensions page and click "Add".</p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Monitor className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="firefox" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Download the extension</h3>
                  <p className="text-muted-foreground mb-4">Click the download button above to get the Firefox add-on file.</p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Monitor className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Open Firefox Add-ons</h3>
                  <p className="text-muted-foreground mb-4">Go to Firefox menu → Add-ons and Themes or navigate to about:addons</p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Monitor className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Install the add-on</h3>
                  <p className="text-muted-foreground mb-4">Click the gear icon → Install Add-on From File and select the downloaded file.</p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Monitor className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="edge" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Download the extension</h3>
                  <p className="text-muted-foreground mb-4">Click the download button above to get the extension file for Edge.</p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Monitor className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Open Edge Extensions</h3>
                  <p className="text-muted-foreground mb-4">Go to Edge menu → Extensions or navigate to edge://extensions/</p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Monitor className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Install the extension</h3>
                  <p className="text-muted-foreground mb-4">Enable "Developer mode" and then drag and drop the file onto the Extensions page.</p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Monitor className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="safari" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Download the extension</h3>
                  <p className="text-muted-foreground mb-4">Click the download button above to get the Safari extension package.</p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Monitor className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Install the package</h3>
                  <p className="text-muted-foreground mb-4">Double-click the downloaded file and follow the installation instructions.</p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Monitor className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Enable in Safari</h3>
                  <p className="text-muted-foreground mb-4">Go to Safari → Preferences → Extensions and enable the extension.</p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Monitor className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Features Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Key Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Our extension provides seamless access to premium tools and enhances your browsing experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="border border-border hover:border-primary/20 hover:shadow-md transition-all group">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="border border-primary/20 bg-primary/5 mb-8">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
              <p className="text-muted-foreground max-w-xl">Download our extension now and unlock the full potential of your premium tools with just one click.</p>
            </div>
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 min-w-[200px]">
              <Download className="mr-2 h-5 w-5" />
              Download Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-lg">Is the extension free to use?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Yes, the extension is completely free to download and use. However, you need an active subscription to access premium tools.</p>
            </CardContent>
          </Card>
          
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-lg">Does it work on all websites?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">The extension works on all websites supported by our platform. You'll see a notification when a tool is available for the current site.</p>
            </CardContent>
          </Card>
          
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-lg">Is my data secure?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Yes, we use industry-standard encryption protocols to ensure your data remains secure. We never store your passwords or sensitive information.</p>
            </CardContent>
          </Card>
          
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-lg">How do I get support?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">If you encounter any issues, please visit our <a href="/dashboard/support" className="text-primary hover:underline">Support Center</a> or email us at support@noxtools.com.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Extension;
