
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const Account = () => {
  // Mock user data - in a real app, you'd fetch this from an API
  const user = {
    username: "shivamg",
    email: "shivam@example.com",
    firstName: "Shivam",
    lastName: "Gaikwad"
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you'd send the form data to your API
    console.log('Account update submitted');
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-semibold mb-8">Account Details</h1>
        
        <Card className="max-w-xl bg-secondary/30 border-secondary/60">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  defaultValue={user.username}
                  disabled
                  className="bg-muted/50"
                />
                <p className="text-xs text-muted-foreground">Username cannot be changed</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  defaultValue={user.email}
                  disabled
                  className="bg-muted/50"
                />
                <p className="text-xs text-muted-foreground">Contact support to change your email</p>
              </div>
              
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    defaultValue={user.firstName}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    defaultValue={user.lastName}
                  />
                </div>
              </div>
              
              <div className="space-y-2 pt-3 border-t border-secondary/60">
                <Label htmlFor="newPassword">New Password (Optional)</Label>
                <Input 
                  id="newPassword" 
                  type="password"
                  placeholder="Leave blank to keep current password"
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end border-t border-secondary/60 pt-5">
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                Update Account
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Account;
