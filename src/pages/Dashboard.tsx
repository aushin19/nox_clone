
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import QuickAccessGrid from '@/components/dashboard/QuickAccessGrid';

const Dashboard = () => {
  // Mock user data - in a real app, you'd fetch this from an API
  const user = {
    name: "Shivam Gaikwad",
    email: "shivam@example.com",
    username: "shivamg",
    firstName: "Shivam",
    lastName: "Gaikwad",
    subscription: {
      plan: "1 Month Membership",
      status: "Active",
      startDate: "2023-05-01",
      expiryDate: "2023-06-01"
    }
  };
  
  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-semibold mb-8 text-foreground">
          Hey, {user.name}! 👋
        </h1>
        
        <QuickAccessGrid />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
