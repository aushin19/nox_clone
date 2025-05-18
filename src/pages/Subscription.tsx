import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  List, 
  Check, 
  CreditCard, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight, 
  Shield, 
  Zap,
  LucideCreditCard,
  Download,
  Clock,
  Receipt,
  BarChart4,
  Gift
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import { cn, formatDate } from '@/lib/utils';

const Subscription = () => {
  const { profile, hasSubscription } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate days left in subscription
  const getDaysLeft = (endDateString: string | null) => {
    if (!endDateString) return 0;
    
    const endDate = new Date(endDateString);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };
  
  // Generate a timestamp for a mock payment history
  const generatePaymentHistory = () => {
    if (!profile?.plan_start_date) return [];
    
    const startDate = new Date(profile.plan_start_date);
    const history = [];
    const now = new Date();
    let currentDate = new Date(startDate);
    
    // Generate payment records for every month since the start date
    while (currentDate <= now) {
      history.unshift({
        date: currentDate.toISOString().split('T')[0],
        amount: profile.plan_price ? `₹${profile.plan_price.toFixed(2)}` : 'Free',
        status: 'Paid',
        method: 'Razorpay'
      });
      
      // Move to next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return history;
  };
  
  const paymentHistory = generatePaymentHistory();
  
  // Features based on plan (with fallbacks to generic features)
  const getPlanFeatures = () => {
    // If no plan or Free plan, return basic features
    if (!profile?.plan_name || profile.plan_name.toLowerCase().includes('free')) {
      return [
        "Access to basic tools",
        "Limited usage per month",
        "Standard support",
        "Community access"
      ];
    }
    
    // For premium plans
    if (profile.plan_name.toLowerCase().includes('premium')) {
      return [
        "Access to all premium tools",
        "Unlimited usage",
        "Priority support",
        "New tools as they launch",
        "API access",
        "Advanced analytics"
      ];
    }
    
    // For other plans (fallback)
    return [
      "Access to standard tools",
      "Extended usage limits",
      "Priority support",
      "Regular updates"
    ];
  };

  const features = getPlanFeatures();
  
  const handleChangePlan = () => {
    setShowPlans(true);
    // Scroll to plan selection
    setTimeout(() => {
      document.getElementById('subscription-plans')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const handleCancelPlan = () => {
    if (!hasSubscription || !profile?.plan_status || profile.plan_status !== 'active') {
      toast.error("No active subscription to cancel");
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.warning("This is a demo. In a real app, this would cancel your subscription.");
      setLoading(false);
    }, 1500);
  };
  
  const handleContactSupport = () => {
    toast.info("Support ticket system coming soon");
  };

  // Subscription stats
  const stats = [
    {
      title: "Plan",
      value: profile?.plan_name || "Free",
      icon: CreditCard,
      color: "text-primary"
    },
    {
      title: "Status",
      value: profile?.plan_status === 'active' ? "Active" : "Inactive",
      icon: Clock,
      color: "text-green-500"
    },
    {
      title: "Next Billing",
      value: profile?.plan_end_date ? formatDate(profile.plan_end_date) : "-",
      icon: Calendar,
      color: "text-blue-500"
    },
    {
      title: "Amount",
      value: profile?.plan_price ? `₹${profile.plan_price.toFixed(2)}` : "Free",
      icon: Receipt,
      color: "text-amber-500"
    }
  ];
  
  return (
    <DashboardLayout>
      <div className="relative">
        {/* Header section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent mb-8 rounded-2xl">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-2">My Subscription</h1>
            <p className="text-muted-foreground mb-6">Manage your subscription plan and billing details</p>
            
            {/* Subscription summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-secondary/5 border border-secondary/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                        <p className={cn("font-semibold text-lg", stat.color === "text-primary" && "text-gradient")}>{stat.value}</p>
                      </div>
                      <div className={cn("p-2 rounded-lg bg-background", stat.color)}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="default" 
                onClick={handleChangePlan}
                className="bg-primary text-white hover:bg-primary/90"
              >
                Upgrade Plan <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              {hasSubscription && profile?.plan_status === 'active' && (
                <Button 
                  variant="outline" 
                  onClick={handleCancelPlan} 
                  disabled={loading}
                  className="border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30"
                >
                  {loading ? "Processing..." : "Cancel Subscription"}
                </Button>
              )}
              
              <Button 
                variant="outline" 
                onClick={handleContactSupport}
                className="border-secondary/30 hover:bg-secondary/10"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b mb-6">
          <Button
            variant="link"
            className={cn(
              "px-4 py-2 rounded-none relative",
              activeTab === 'overview' 
                ? "text-primary font-medium" 
                : "text-muted-foreground"
            )}
            onClick={() => setActiveTab('overview')}
          >
            Overview
            {activeTab === 'overview' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
            )}
          </Button>
          
          <Button
            variant="link"
            className={cn(
              "px-4 py-2 rounded-none relative",
              activeTab === 'billing' 
                ? "text-primary font-medium" 
                : "text-muted-foreground"
            )}
            onClick={() => setActiveTab('billing')}
          >
            Billing History
            {activeTab === 'billing' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
            )}
          </Button>
          
          <Button
            variant="link"
            className={cn(
              "px-4 py-2 rounded-none relative",
              activeTab === 'plans' 
                ? "text-primary font-medium" 
                : "text-muted-foreground"
            )}
            onClick={() => {
              setActiveTab('plans');
              setShowPlans(true);
            }}
          >
            Available Plans
            {activeTab === 'plans' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
            )}
          </Button>
        </div>
        
        {/* Tab content */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Current Plan Card */}
                <Card className="border border-secondary/20 md:col-span-2">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">Subscription Details</CardTitle>
                      <Badge className={profile?.plan_status === 'active' ? 'bg-green-500/20 text-green-500 border-green-500/30' : 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'}>
                        {profile?.plan_status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <CardDescription>Your current subscription information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!profile?.plan_name ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center bg-secondary/5 rounded-lg">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-secondary/20 mb-4">
                          <AlertCircle className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">No Active Subscription</h3>
                        <p className="text-muted-foreground mb-6 max-w-md">
                          You are currently on the free plan with limited features. Upgrade to get access to all premium tools and features.
                        </p>
                        <Button 
                          className="bg-primary text-white hover:bg-primary/90"
                          onClick={handleChangePlan}
                        >
                          Explore Premium Plans <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Plan Name</p>
                            <p className="font-medium text-lg">
                              <span className="text-gradient">{profile.plan_name}</span>
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                            <div className="flex items-center gap-2">
                              <LucideCreditCard className="h-4 w-4 text-muted-foreground" />
                              <p className="font-medium">Razorpay</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                            <p className="font-medium">{formatDate(profile.plan_start_date)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Expiry Date</p>
                            <div className="flex items-center">
                              <p className="font-medium">
                                {formatDate(profile.plan_end_date)}
                              </p>
                              {profile.plan_end_date && new Date(profile.plan_end_date) > new Date() && (
                                <Badge className="ml-2 bg-green-500/10 text-green-500 border-green-500/20">
                                  {getDaysLeft(profile.plan_end_date)} days left
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-secondary/20">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Next Billing</p>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span>{formatDate(profile.plan_end_date)}</span>
                              <Badge className="bg-primary/10 text-primary border-primary/20">
                                ₹{profile.plan_price?.toFixed(2) || '0.00'}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <Button 
                              variant="outline" 
                              onClick={handleChangePlan}
                              className="border-secondary/30 hover:bg-secondary/10"
                            >
                              Change Plan
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={handleCancelPlan} 
                              disabled={loading || !hasSubscription}
                              className="border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30"
                            >
                              {loading ? "Processing..." : "Cancel"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Plan Features */}
                <Card className="border border-secondary/20 h-fit">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Plan Features
                    </CardTitle>
                    <CardDescription>
                      {hasSubscription ? "Your plan includes" : "Free plan includes"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="rounded-full bg-primary/10 p-1 mt-0.5 text-primary">
                            <Check className="h-3 w-3" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {!hasSubscription && (
                      <div className="mt-6 pt-4 border-t border-secondary/20">
                        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                          <Gift className="h-4 w-4 text-primary" />
                          Premium Features
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <div className="rounded-full bg-secondary/20 p-1 mt-0.5 text-muted-foreground">
                              <Zap className="h-3 w-3" />
                            </div>
                            <span className="text-sm text-muted-foreground">Access to premium tools</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="rounded-full bg-secondary/20 p-1 mt-0.5 text-muted-foreground">
                              <Zap className="h-3 w-3" />
                            </div>
                            <span className="text-sm text-muted-foreground">Unlimited usage</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="rounded-full bg-secondary/20 p-1 mt-0.5 text-muted-foreground">
                              <Zap className="h-3 w-3" />
                            </div>
                            <span className="text-sm text-muted-foreground">Priority support</span>
                          </li>
                        </ul>
                        
                        <Button 
                          variant="outline"
                          className="w-full mt-4 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
                          onClick={handleChangePlan}
                        >
                          Upgrade Now
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* Usage Stats (simplified example) */}
              <Card className="border border-secondary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BarChart4 className="h-5 w-5 text-primary" />
                    Usage Statistics
                  </CardTitle>
                  <CardDescription>
                    Your tool usage for the current billing period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-24 flex items-center justify-center text-muted-foreground">
                    Usage stats visualization would appear here
                  </div>
                </CardContent>
              </Card>
            </>
          )}
          
          {/* Billing History Tab */}
          {activeTab === 'billing' && (
            <Card className="border border-secondary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  Billing History
                </CardTitle>
                <CardDescription>Your payment history and receipts</CardDescription>
              </CardHeader>
              <CardContent>
                {paymentHistory.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-secondary/20 mb-4">
                      <List className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No Billing History</h3>
                    <p className="text-muted-foreground max-w-md">
                      When you subscribe to a plan, your payment history will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-secondary/30">
                          <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
                          <th className="text-left py-3 px-4 text-muted-foreground font-medium">Amount</th>
                          <th className="text-left py-3 px-4 text-muted-foreground font-medium">Method</th>
                          <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                          <th className="text-right py-3 px-4 text-muted-foreground font-medium">Receipt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentHistory.map((item, index) => (
                          <tr key={index} className="border-b border-secondary/20 hover:bg-secondary/5 transition-colors">
                            <td className="py-3 px-4">{formatDate(item.date)}</td>
                            <td className="py-3 px-4 font-medium">{item.amount}</td>
                            <td className="py-3 px-4">{item.method}</td>
                            <td className="py-3 px-4">
                              <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                                {item.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm" className="h-8 text-primary">
                                <Download className="h-4 w-4 mr-1" />
                                PDF
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Plans Tab */}
          {activeTab === 'plans' && (
            <Card className="border border-secondary/20" id="subscription-plans">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Subscription Plans</CardTitle>
                <CardDescription>Choose the plan that works best for you</CardDescription>
              </CardHeader>
              <CardContent>
                <SubscriptionPlans />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subscription;
