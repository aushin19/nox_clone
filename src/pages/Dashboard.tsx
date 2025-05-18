import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import QuickAccessGrid from '@/components/dashboard/QuickAccessGrid';
import EmailVerificationBanner from '@/components/EmailVerificationBanner';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, ArrowUpRight, Calendar, LineChart, Users } from 'lucide-react';

const Dashboard = () => {
  const { user, profile } = useAuth();

  // Get user's display name
  const displayName = profile?.first_name 
    ? `${profile.first_name} ${profile.last_name || ''}`.trim() 
    : profile?.username || 'there';
  
  return (
    <DashboardLayout>
      <div className="relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 p-6 md:p-8">
          {/* Email verification banner */}
          <EmailVerificationBanner className="mb-6" />
          
          {/* Greeting and Stats Overview */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1">
              <div className="glass-card rounded-xl p-6 mb-6 animate-fade-in">
                <h1 className="text-3xl font-bold">
                  Hey, <span className="text-gradient">{displayName}!</span> 👋
                </h1>
                <p className="text-muted-foreground mt-2">Welcome to your dashboard. Here's what's happening today.</p>
              </div>
              
              {/* Stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in" style={{animationDelay: '0.1s'}}>
                <StatsCard 
                  title="Tools Used" 
                  value="28" 
                  trend="+5%" 
                  icon={<Activity className="h-5 w-5 text-primary" />} 
                  description="Last 30 days"
                />
                <StatsCard 
                  title="Active Sessions" 
                  value="3" 
                  trend="+2" 
                  icon={<Users className="h-5 w-5 text-green-500" />} 
                  description="Currently active"
                />
                <StatsCard 
                  title="Usage Time" 
                  value="12.5h" 
                  trend="+3.2h" 
                  icon={<Clock className="h-5 w-5 text-blue-500" />} 
                  description="This week"
                />
                <StatsCard 
                  title="Saved Credits" 
                  value="250" 
                  trend="+20%" 
                  icon={<LineChart className="h-5 w-5 text-amber-500" />} 
                  description="From premium tools"
                />
              </div>
            </div>
            
            {/* Calendar/Recent Activity Card */}
            <div className="w-full md:w-80 lg:w-96 glass-card rounded-xl p-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Upcoming Events</h3>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              
              {/* Event items */}
              <div className="space-y-4">
                <EventItem 
                  title="AI Tools Webinar"
                  time="Tomorrow, 2:00 PM"
                  tag="Webinar"
                />
                <EventItem 
                  title="New Feature Release"
                  time="Friday, 10:00 AM"
                  tag="Product"
                />
                <EventItem 
                  title="Subscription Renewal"
                  time="Oct 15, 12:00 AM"
                  tag="Billing"
                />
              </div>
              
              <button className="w-full mt-4 text-primary text-sm font-medium flex items-center justify-center gap-1 hover:underline">
                View All Events <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </div>
          
          {/* Tools Section */}
          <div className="mb-8 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Quick Access</h2>
              <span className="text-sm text-muted-foreground">Your most used tools</span>
            </div>
            <QuickAccessGrid />
          </div>
          
          {/* Recent Activities */}
          <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Recent Activity</h2>
              <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                View All <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
            <div className="glass-card rounded-xl p-6">
              <div className="space-y-4">
                <ActivityItem 
                  title="Used Image Generator" 
                  time="2 hours ago" 
                  description="You created 12 images with the AI Image Generator tool"
                />
                <ActivityItem 
                  title="Updated Account Settings" 
                  time="Yesterday" 
                  description="Changed notification preferences and security settings"
                />
                <ActivityItem 
                  title="Shared Tool with Team" 
                  time="3 days ago" 
                  description="Shared the Code Assistant tool with your team"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, trend, icon, description }) => (
  <Card className="glass-card border-secondary/30 hover:border-primary/30 transition-all">
    <CardContent className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <h4 className="text-2xl font-bold">{value}</h4>
            <span className="text-xs text-green-500">{trend}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
        <div className="p-2 rounded-md bg-secondary/50">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

// Event Item Component
const EventItem = ({ title, time, tag }) => (
  <div className="flex items-start justify-between p-3 rounded-md hover:bg-secondary/50 transition-colors">
    <div>
      <h4 className="font-medium text-sm">{title}</h4>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
    <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
      {tag}
    </span>
  </div>
);

// Activity Item Component
const ActivityItem = ({ title, time, description }) => (
  <div className="flex items-start gap-4 p-3 rounded-md hover:bg-secondary/50 transition-colors">
    <div className="mt-1 p-2 rounded-full bg-primary/20">
      <Activity className="h-4 w-4 text-primary" />
    </div>
    <div>
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{title}</h4>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  </div>
);

// Clock icon component
const Clock = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default Dashboard;
