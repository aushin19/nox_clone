import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  MessageCircle, 
  PhoneCall, 
  Send, 
  Bot, 
  Paperclip, 
  MoveRight, 
  Clock,
  HelpCircle,
  FileQuestion,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Support = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketPriority, setTicketPriority] = useState("medium");
  const [ticketEmail, setTicketEmail] = useState("");

  // Mock FAQ data
  const faqCategories = [
    {
      title: "Account & Billing",
      icon: <Clock className="h-5 w-5" />,
      questions: [
        {
          question: "How do I reset my password?",
          answer: "To reset your password, go to the login page and click on 'Forgot Password'. Enter your email, and you will receive a password reset link. Click the link and follow the instructions to set a new password."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and cryptocurrency payments (Bitcoin, Ethereum). All payments are processed securely through our payment providers."
        }
      ]
    },
    {
      title: "Extension & Tools",
      icon: <HelpCircle className="h-5 w-5" />,
      questions: [
        {
          question: "How do I access the tools after subscribing?",
          answer: "After subscribing, you need to download and install our browser extension. The extension allows seamless access to all the premium tools included in your subscription. Visit the 'Download Extension' section for detailed instructions."
        },
        {
          question: "Can I share my account with others?",
          answer: "No, account sharing is not allowed as per our Terms of Service. Each subscription is for individual use only. We monitor account activity and may suspend accounts that show signs of sharing."
        }
      ]
    },
    {
      title: "Troubleshooting",
      icon: <FileQuestion className="h-5 w-5" />,
      questions: [
        {
          question: "Why is a tool not working for me?",
          answer: "If a tool isn't working, first make sure your subscription is active and try refreshing the page. Clear your browser cache or try using incognito mode. If the problem persists, use our 'Fix a Tool' feature to report the issue."
        },
        {
          question: "How can I cancel my subscription?",
          answer: "To cancel your subscription, go to 'My Subscription' page and click on 'Cancel Subscription'. You'll continue to have access until the end of your current billing period. No refunds are provided for partial months."
        }
      ]
    },
    {
      title: "Features",
      icon: <MessageSquare className="h-5 w-5" />,
      questions: [
        {
          question: "What's included in my subscription?",
          answer: "Your subscription includes access to all 50+ premium tools, free future updates as we add more tools, 24/7 dedicated support, and instant activation of your account. All plans come with the same features—the only difference is the billing period and price."
        },
        {
          question: "Are there any usage limits?",
          answer: "Premium subscriptions have no usage limits for most tools. However, some resource-intensive tools may have fair usage policies to ensure optimal performance for all users."
        }
      ]
    }
  ];

  return (
    <DashboardLayout>
      {/* Hero Section */}
      <section className="w-full py-8 md:py-12 lg:py-16 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col gap-4">
              <Badge variant="outline">Support Center</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                How can we help you today?
              </h1>
              <p className="text-xl text-muted-foreground max-w-md">
                Get quick answers, troubleshooting tips, and personalized support to resolve your issues faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" className="gap-2" onClick={() => setChatOpen(true)}>
                  Start Live Chat <MessageCircle className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  View Documentation <MoveRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 flex flex-col items-center justify-center text-center">
                <MessageCircle className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold">Live Chat</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Chat with our support team in real-time
                </p>
                <Button variant="ghost" className="mt-4" onClick={() => setChatOpen(true)}>
                  Start Chat
                </Button>
              </Card>
              <Card className="p-6 flex flex-col items-center justify-center text-center">
                <PhoneCall className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold">WhatsApp Support</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Connect with us on WhatsApp
                </p>
                <Button variant="ghost" className="mt-4">
                  +1 (800) 123-4567
                </Button>
              </Card>
              <Card className="p-6 flex flex-col items-center justify-center text-center">
                <FileQuestion className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold">Fix a Tool</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Report issues with specific tools
                </p>
                <Button variant="ghost" className="mt-4" asChild>
                  <a href="/dashboard/fixtool">Report Issue</a>
                </Button>
              </Card>
              <Card className="p-6 flex flex-col items-center justify-center text-center">
                <AlertCircle className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold">Submit Ticket</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Create a support ticket for complex issues
                </p>
                <Button variant="ghost" className="mt-4" onClick={() => document.getElementById('ticket-section')?.scrollIntoView({ behavior: 'smooth' })}>
                  New Ticket
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Base Section */}
      <section className="w-full py-8 md:py-12 lg:py-16 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <Badge variant="outline" className="mb-4">Knowledge Base</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Find answers to common questions and learn how to get the most out of our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {faqCategories.map((category, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="bg-primary/10 p-2 rounded-md">
                    {category.icon}
                  </div>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${index}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full gap-2">
                    View All <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Support & Ticket Section */}
      <section className="w-full py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Live Support Chat
                </CardTitle>
                <CardDescription>
                  Connect with our support team in real-time for immediate assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-muted rounded-lg p-6 h-[300px] flex flex-col items-center justify-center text-center">
                  <Bot className="h-16 w-16 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Start a conversation</h3>
                  <p className="text-muted-foreground mb-6">
                    Our support agents are online and ready to help you with any questions
                  </p>
                  <Button className="gap-2" onClick={() => setChatOpen(true)}>
                    Start Chat <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-6">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="h-2 w-2 rounded-full bg-green-500 absolute top-0 right-0"></div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium">5</span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">Agents online</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Avg. response time: 2 min</span>
                </div>
              </CardFooter>
            </Card>

            {/* Ticket Submission Form */}
            <Card id="ticket-section">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileQuestion className="h-5 w-5 text-primary" />
                  Submit a Support Ticket
                </CardTitle>
                <CardDescription>
                  Create a ticket for issues that require more detailed investigation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={ticketEmail}
                      onChange={(e) => setTicketEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      placeholder="Brief description of your issue" 
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          id="low" 
                          name="priority" 
                          value="low"
                          checked={ticketPriority === "low"}
                          onChange={() => setTicketPriority("low")}
                          className="h-4 w-4 text-primary" 
                        />
                        <Label htmlFor="low" className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          Low
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          id="medium" 
                          name="priority" 
                          value="medium"
                          checked={ticketPriority === "medium"}
                          onChange={() => setTicketPriority("medium")}
                          className="h-4 w-4 text-primary" 
                        />
                        <Label htmlFor="medium" className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                          Medium
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          id="high" 
                          name="priority" 
                          value="high"
                          checked={ticketPriority === "high"}
                          onChange={() => setTicketPriority("high")}
                          className="h-4 w-4 text-primary" 
                        />
                        <Label htmlFor="high" className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-red-500"></span>
                          High
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Please provide details about your issue..." 
                      rows={5}
                      value={ticketDescription}
                      onChange={(e) => setTicketDescription(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attachments">Attachments (optional)</Label>
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Paperclip className="w-8 h-8 mb-3 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PDF, PNG, JPG or GIF (MAX. 10MB)
                          </p>
                        </div>
                        <input id="file-upload" type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-6">
                <Button variant="outline">Cancel</Button>
                <Button className="gap-2">
                  Submit Ticket <Send className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Indicators */}
      <section className="w-full py-8 md:py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our support team is available around the clock to assist you
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">95% Resolution Rate</h3>
              <p className="text-muted-foreground">
                Most issues are resolved on the first contact with our team
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2 Minute Response</h3>
              <p className="text-muted-foreground">
                Average response time for live chat and phone support
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">500+ Help Articles</h3>
              <p className="text-muted-foreground">
                Comprehensive knowledge base with detailed guides
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-background border rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Support Chat</h3>
                  <p className="text-xs text-muted-foreground">Online • Typically replies in minutes</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setChatOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 h-80 overflow-y-auto border-b">
              <div className="flex gap-3 mb-4">
                <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Hello! How can I help you today?</p>
                </div>
              </div>
              <div className="flex justify-end mb-4">
                <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">I need help with my subscription.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">I'd be happy to help with your subscription. What specific issue are you having?</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Type your message..." 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1" 
                />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Powered by Support AI</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Support;
