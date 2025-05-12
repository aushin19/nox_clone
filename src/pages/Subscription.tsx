
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, List, Check } from 'lucide-react';

const Subscription = () => {
  // Enhanced dummy subscription data
  const subscription = {
    plan: "Premium Monthly",
    status: "Active",
    startDate: "2023-05-01",
    expiryDate: "2023-06-01",
    paymentMethod: "Visa •••• 4242",
    nextBilling: "2023-06-01",
    amount: "$29.99",
    features: [
      "Access to all premium tools",
      "Unlimited usage",
      "Priority support",
      "New tools as they launch"
    ],
    history: [
      { date: "2023-05-01", amount: "$29.99", status: "Paid" },
      { date: "2023-04-01", amount: "$29.99", status: "Paid" },
      { date: "2023-03-01", amount: "$29.99", status: "Paid" }
    ]
  };

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-semibold mb-8">My Subscription</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Current Plan Card */}
          <Card className="bg-secondary/30 border-secondary/60 col-span-full md:col-span-1 lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Current Plan</CardTitle>
                <Badge className={subscription.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}>
                  {subscription.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Plan</p>
                  <p className="font-medium text-lg">{subscription.plan}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium">{subscription.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">{formatDate(subscription.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expiry Date</p>
                  <p className="font-medium">{formatDate(subscription.expiryDate)}</p>
                </div>
              </div>
              
              <div className="pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-secondary/60">
                <div>
                  <p className="text-sm text-muted-foreground">Next Billing</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{formatDate(subscription.nextBilling)}</span>
                    <span className="font-bold text-primary">{subscription.amount}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="destructive">Cancel</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Plan Features */}
          <Card className="bg-secondary/20 border-secondary/50 col-span-full md:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">Plan Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {subscription.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* Billing History */}
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <List className="h-5 w-5" />
                Billing History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-secondary/60">
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscription.history.map((item, index) => (
                      <tr key={index} className="border-b border-secondary/30">
                        <td className="py-3 px-4">{item.date}</td>
                        <td className="py-3 px-4">{item.amount}</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="bg-green-500/20 text-green-500 border-green-500/30">
                            {item.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-full bg-secondary/10">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium text-lg mb-2">Need help with your subscription?</h3>
                  <p className="text-muted-foreground">
                    Our support team is available 24/7 to assist you with any questions
                  </p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subscription;
