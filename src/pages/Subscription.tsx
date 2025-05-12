
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Subscription = () => {
  // Mock subscription data - in a real app, you'd fetch this from an API
  const subscription = {
    plan: "1 Month Membership",
    status: "Active",
    startDate: "2023-05-01",
    expiryDate: "2023-06-01"
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

        <Card className="max-w-xl bg-secondary/30 border-secondary/60">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Subscription Details</CardTitle>
              <Badge className={subscription.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}>
                {subscription.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="font-medium">{subscription.plan}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">{subscription.status}</p>
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
            
            <div className="pt-4 border-t border-secondary/60">
              <h3 className="font-medium text-lg mb-2">Need to change your plan?</h3>
              <p className="text-muted-foreground mb-4">
                Contact our support team for assistance with plan changes or renewals
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Subscription;
