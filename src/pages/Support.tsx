
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Support = () => {
  // Mock FAQ data
  const faqs = [
    {
      question: "How can I reset my password?",
      answer: "To reset your password, go to the login page and click on 'Forgot Password'. Enter your email, and you will receive a password reset link. Click the link and follow the instructions to set a new password."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and cryptocurrency payments (Bitcoin, Ethereum). All payments are processed securely through our payment providers."
    },
    {
      question: "How do I access the tools after subscribing?",
      answer: "After subscribing, you need to download and install our browser extension. The extension allows seamless access to all the premium tools included in your subscription. Visit the 'Download Extension' section for detailed instructions."
    },
    {
      question: "Can I share my account with others?",
      answer: "No, account sharing is not allowed as per our Terms of Service. Each subscription is for individual use only. We monitor account activity and may suspend accounts that show signs of sharing."
    },
    {
      question: "How can I cancel my subscription?",
      answer: "To cancel your subscription, go to 'My Subscription' page and click on 'Cancel Subscription'. You'll continue to have access until the end of your current billing period. No refunds are provided for partial months."
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-semibold mb-2">Support Center</h1>
        <p className="text-muted-foreground mb-8">Need help? Reach out to us.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="bg-secondary/30 border-secondary/60">
            <CardHeader>
              <CardTitle className="text-xl">Live Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">Chat with our support team in real-time.</p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Start Live Whatsapp Chat
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/30 border-secondary/60">
            <CardHeader>
              <CardTitle className="text-xl">Email Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">Send us an email and we'll respond within 24 hours.</p>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Email Support Team
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-semibold mb-2">Frequently Asked Questions (FAQs)</h2>
        <p className="text-muted-foreground mb-6">Find answers to commonly asked questions.</p>
        
        <div className="bg-secondary/30 border border-secondary/60 rounded-xl p-6">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border border-secondary/60 bg-background/30 backdrop-blur-sm rounded-lg px-5"
              >
                <AccordionTrigger className="text-lg py-5 hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Support;
