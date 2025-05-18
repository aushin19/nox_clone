import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Wrench, 
  Send, 
  ChevronRight, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  HelpCircle, 
  FileText, 
  MessageSquare, 
  Image, 
  Link,
  CornerRightDown,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const FixTool = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [toolName, setToolName] = useState('');
  const [toolUrl, setToolUrl] = useState('');
  const [description, setDescription] = useState('');
  const [browser, setBrowser] = useState('');
  const [activeTab, setActiveTab] = useState('report');

  // Mock data for past reports
  const userReports = [
    {
      id: 'R-2023-05-12',
      toolName: 'Email Extractor',
      date: '2 days ago',
      status: 'in-progress',
      description: 'Tool fails to extract emails from certain domains',
      statusText: 'Under Investigation'
    },
    {
      id: 'R-2023-05-10',
      toolName: 'Image Converter',
      date: '4 days ago',
      status: 'resolved',
      description: 'SVG to PNG conversion producing blank images',
      statusText: 'Fixed in v1.2.4'
    },
    {
      id: 'R-2023-05-08',
      toolName: 'Password Generator',
      date: '6 days ago',
      status: 'pending',
      description: 'Generated passwords not meeting specified criteria',
      statusText: 'Awaiting Review'
    }
  ];

  // Mock data for recent fixes
  const recentFixes = [
    {
      id: 'F-2023-05-11',
      toolName: 'SEO Analyzer',
      date: '3 days ago',
      issue: 'Fixed incorrect keyword density calculation',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://i.pravatar.cc/150?img=1'
      }
    },
    {
      id: 'F-2023-05-09',
      toolName: 'PDF Merger',
      date: '5 days ago',
      issue: 'Resolved issue with bookmarks not transferring to merged document',
      user: {
        name: 'Alex Thompson',
        avatar: 'https://i.pravatar.cc/150?img=2'
      }
    },
    {
      id: 'F-2023-05-07',
      toolName: 'JSON Formatter',
      date: '1 week ago',
      issue: 'Fixed bug causing nested arrays to be improperly formatted',
      user: {
        name: 'Luis Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=3'
      }
    },
    {
      id: 'F-2023-05-05',
      toolName: 'Code Beautifier',
      date: '9 days ago',
      issue: 'Fixed inconsistent indentation in beautified code',
      user: {
        name: 'Sara Ahmed',
        avatar: 'https://i.pravatar.cc/150?img=4'
      }
    }
  ];

  const handleNextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd submit this data to your API
    alert('Tool issue reported successfully!');
    setToolName('');
    setToolUrl('');
    setDescription('');
    setBrowser('');
    setActiveStep(1);
  };

  const getStepStatus = (step) => {
    if (step < activeStep) return 'complete';
    if (step === activeStep) return 'current';
    return 'upcoming';
  };

  return (
    <DashboardLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-transparent rounded-2xl mb-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <Badge className="mb-4">Tool Support</Badge>
              <h1 className="text-4xl font-bold mb-4">Report & Fix Tools</h1>
              <p className="text-xl text-muted-foreground mb-6 max-w-xl">
                Found a tool that's not working properly? Help us improve by reporting issues and tracking their resolution.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="gap-2"
                  onClick={() => {
                    setActiveTab('report');
                    document.getElementById('report-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Report an Issue <Wrench className="h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => {
                    setActiveTab('status');
                    document.getElementById('report-tabs')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Check Status <Clock className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center justify-center md:justify-end">
              <div className="w-40 h-40 md:w-52 md:h-52 bg-primary/10 rounded-full flex items-center justify-center">
                <Wrench className="h-16 w-16 md:h-20 md:w-20 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Resolved Issues</p>
                <h3 className="text-3xl font-bold mt-1">247</h3>
              </div>
              <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 flex items-center gap-1">
              <span className="text-green-500 font-medium">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Average Response Time</p>
                <h3 className="text-3xl font-bold mt-1">1.4 Days</h3>
              </div>
              <div className="h-12 w-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 flex items-center gap-1">
              <span className="text-green-500 font-medium">-0.3 days</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Satisfaction Rate</p>
                <h3 className="text-3xl font-bold mt-1">94.7%</h3>
              </div>
              <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 flex items-center gap-1">
              <span className="text-green-500 font-medium">+3.2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Tabs for Report Form and Status */}
      <section id="report-tabs" className="mb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="report" className="gap-2">
              <Wrench className="h-4 w-4" />
              Report Issue
            </TabsTrigger>
            <TabsTrigger value="status" className="gap-2">
              <Clock className="h-4 w-4" />
              Check Status
            </TabsTrigger>
          </TabsList>

          <TabsContent value="report">
            {/* Report Form */}
            <Card id="report-form" className="border border-input shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Submit a Tool Issue Report</CardTitle>
                <CardDescription>
                  Please provide detailed information about the issue you're experiencing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Stepper */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    {[1, 2, 3].map((step) => (
                      <div 
                        key={step} 
                        className={cn(
                          "flex flex-col items-center",
                          { "text-muted-foreground": getStepStatus(step) === 'upcoming' }
                        )}
                      >
                        <div 
                          className={cn(
                            "w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 font-semibold",
                            {
                              "bg-primary text-primary-foreground border-primary": getStepStatus(step) === 'current',
                              "bg-primary/10 border-primary/50 text-primary": getStepStatus(step) === 'complete',
                              "bg-muted border-muted-foreground/30": getStepStatus(step) === 'upcoming'
                            }
                          )}
                        >
                          {getStepStatus(step) === 'complete' ? <CheckCircle className="h-5 w-5" /> : step}
                        </div>
                        <span className="text-sm font-medium">
                          {step === 1 ? 'Tool Details' : step === 2 ? 'Issue Description' : 'Review & Submit'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Progress 
                    value={((activeStep - 1) / 2) * 100} 
                    className="h-2" 
                  />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Tool Details */}
                  {activeStep === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="toolName">Tool Name</Label>
                        <Input 
                          id="toolName" 
                          placeholder="e.g., PDF Converter, Image Extractor" 
                          value={toolName}
                          onChange={(e) => setToolName(e.target.value)}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="toolUrl">Tool URL</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="toolUrl" 
                            placeholder="https://example.com/tools/..." 
                            value={toolUrl}
                            onChange={(e) => setToolUrl(e.target.value)}
                            required 
                          />
                          <Button variant="outline" size="icon" type="button">
                            <Link className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Enter the exact URL where you encountered the issue.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="browser">Browser/Environment</Label>
                        <select 
                          id="browser" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={browser}
                          onChange={(e) => setBrowser(e.target.value)}
                          required
                        >
                          <option value="">Select your browser</option>
                          <option value="chrome">Google Chrome</option>
                          <option value="firefox">Mozilla Firefox</option>
                          <option value="safari">Safari</option>
                          <option value="edge">Microsoft Edge</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Issue Description */}
                  {activeStep === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="description">Issue Description</Label>
                        <Textarea 
                          id="description" 
                          placeholder="Please describe what happened and what you expected to happen..." 
                          rows={6}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Issue Type</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {['Not Loading', 'Error Message', 'Wrong Output', 'Performance', 'UI Problem', 'Other'].map((type) => (
                            <div 
                              key={type} 
                              className="flex items-center p-3 border rounded-md cursor-pointer hover:border-primary hover:bg-primary/5"
                            >
                              <input 
                                type="radio" 
                                id={`type-${type}`} 
                                name="issueType" 
                                className="h-4 w-4 text-primary" 
                              />
                              <Label htmlFor={`type-${type}`} className="ml-2 cursor-pointer">{type}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Attach Screenshots (Optional)</Label>
                        <div className="flex items-center justify-center w-full">
                          <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Image className="w-8 h-8 mb-3 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PNG, JPG or GIF (MAX. 5MB)
                              </p>
                            </div>
                            <input id="file-upload" type="file" className="hidden" />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Review & Submit */}
                  {activeStep === 3 && (
                    <div className="space-y-6">
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold mb-3">Review Your Report</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Tool Name</p>
                              <p className="font-medium">{toolName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Browser/Environment</p>
                              <p className="font-medium capitalize">{browser}</p>
                            </div>
                            <div className="md:col-span-2">
                              <p className="text-sm text-muted-foreground">Tool URL</p>
                              <p className="font-medium text-primary overflow-hidden text-ellipsis">{toolUrl}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Issue Description</p>
                            <p className="font-medium">{description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-muted/30 rounded-lg">
                        <HelpCircle className="h-8 w-8 text-primary mr-4" />
                        <div>
                          <p className="font-medium">What happens next?</p>
                          <p className="text-sm text-muted-foreground">
                            Our team will review your report and begin working on a fix. You'll receive email updates as we make progress.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          id="consent" 
                          className="h-4 w-4 text-primary rounded border-gray-300"
                          required 
                        />
                        <Label htmlFor="consent" className="ml-2 text-sm">
                          I confirm this report is accurate and I consent to being contacted about this issue
                        </Label>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-6">
                {activeStep > 1 && (
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={handlePrevStep}
                  >
                    Previous
                  </Button>
                )}
                {activeStep < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="ml-auto"
                  >
                    Next Step <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="ml-auto gap-2"
                  >
                    Submit Report <Send className="h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="status">
            {/* Past Reports & Recent Fixes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Past Reports */}
              <Card className="border border-input shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Your Reports
                  </CardTitle>
                  <CardDescription>
                    Track the status of your submitted tool issue reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userReports.length > 0 ? (
                    <div className="space-y-4">
                      {userReports.map((report) => (
                        <div key={report.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Badge variant={
                                report.status === 'resolved' ? 'default' :
                                report.status === 'in-progress' ? 'secondary' : 'outline'
                              }>
                                {report.statusText}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{report.date}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">ID: {report.id}</span>
                          </div>
                          <h4 className="font-semibold mb-1">{report.toolName}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                          <div className="flex justify-end">
                            <Button variant="ghost" size="sm" className="text-xs gap-1">
                              View Details <ChevronRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Reports Yet</h3>
                      <p className="text-muted-foreground mb-6 max-w-sm">
                        You haven't submitted any tool issue reports yet. When you do, they'll appear here.
                      </p>
                      <Button 
                        onClick={() => {
                          setActiveTab('report');
                        }}
                        className="gap-2"
                      >
                        Report an Issue <Wrench className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t p-4 flex justify-center">
                  <Button variant="ghost" className="gap-2">
                    View All Reports <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Recent Fixes */}
              <Card className="border border-input shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-primary" />
                    Recently Fixed Tools
                  </CardTitle>
                  <CardDescription>
                    See the latest tools that have been fixed based on user reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentFixes.map((fix) => (
                      <Card key={fix.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold">{fix.toolName}</h4>
                              <p className="text-sm text-muted-foreground">{fix.date}</p>
                            </div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
                              Fixed
                            </Badge>
                          </div>
                          <p className="text-sm mb-3">{fix.issue}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={fix.user.avatar} alt={fix.user.name} />
                                <AvatarFallback>{fix.user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">Reported by {fix.user.name}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-7 text-xs px-2">
                              Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4 flex justify-center">
                  <Button variant="ghost" className="gap-2">
                    View All Fixes <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Help Section */}
      <section className="mb-8">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Need More Help?</h2>
                <p className="text-muted-foreground mb-6">
                  If you're experiencing multiple issues or need more personalized assistance, our support team is ready to help.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Contact Support
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <CornerRightDown className="h-4 w-4" />
                    View Tutorials
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-end">
                <div className="grid grid-cols-2 gap-4 max-w-xs">
                  <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-background">
                    <AlertTriangle className="h-8 w-8 text-orange-500 mb-3" />
                    <h3 className="font-medium text-sm">Known Issues</h3>
                    <span className="text-2xl font-bold mt-1">14</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-background">
                    <CheckCircle className="h-8 w-8 text-green-500 mb-3" />
                    <h3 className="font-medium text-sm">Fixed This Week</h3>
                    <span className="text-2xl font-bold mt-1">32</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-background">
                    <Clock className="h-8 w-8 text-blue-500 mb-3" />
                    <h3 className="font-medium text-sm">Avg. Fix Time</h3>
                    <span className="text-2xl font-bold mt-1">2.3d</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-background">
                    <MessageSquare className="h-8 w-8 text-purple-500 mb-3" />
                    <h3 className="font-medium text-sm">Response Rate</h3>
                    <span className="text-2xl font-bold mt-1">98%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </DashboardLayout>
  );
};

export default FixTool;
