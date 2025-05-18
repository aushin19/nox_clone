import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Shield, 
  Key, 
  Globe, 
  Calendar, 
  Phone, 
  MapPin, 
  Edit, 
  Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const Account = () => {
  // Mock user data - in a real app, you'd fetch this from an API
  const userData = {
    name: "Shivam Gaikwad",
    username: "shivamg",
    email: "shivam@example.com",
    avatar: "https://github.com/shadcn.png",
    role: "Premium Member",
    joinDate: "Jan 2023"
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you'd send the form data to your API
    console.log('Account update submitted');
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 space-y-6 max-w-4xl">
        <Card className="border-none shadow-md">
          <CardHeader className="pb-0">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1.5">
                <CardTitle className="text-2xl">{userData.name}</CardTitle>
                <CardDescription className="text-base flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {userData.username}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {userData.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Joined {userData.joinDate}
                  </span>
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Shield className="h-4 w-4 mr-2" />
                    {userData.role}
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="personal">
              <User className="h-4 w-4 mr-2" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="account">
              <Lock className="h-4 w-4 mr-2" />
              Account Settings
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue={userData.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input id="displayName" defaultValue={userData.username} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={userData.email} disabled className="bg-muted/50" />
                    <p className="text-xs text-muted-foreground">Contact support to change your email</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex gap-2">
                      <Input id="location" placeholder="City, Country" />
                      <Button variant="outline" size="icon">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio" 
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us about yourself"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Language & Region</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <select 
                        id="language" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="en-US">English (US)</option>
                        <option value="en-GB">English (UK)</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="es">Spanish</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <select 
                        id="timezone" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="utc">UTC</option>
                        <option value="est">Eastern Time (ET)</option>
                        <option value="cst">Central Time (CT)</option>
                        <option value="mst">Mountain Time (MT)</option>
                        <option value="pst">Pacific Time (PT)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive emails about account activity</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing-emails">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
                      </div>
                      <Switch id="marketing-emails" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Account Management</h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Globe className="h-4 w-4 mr-2" />
                      Connect Social Accounts
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto text-destructive hover:text-destructive">
                      Deactivate Account
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Change Password</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button className="w-full sm:w-auto">
                      <Key className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="2fa" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Login Sessions</h3>
                  <div className="space-y-4 rounded-md border p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Current Session</p>
                        <p className="text-xs text-muted-foreground">Last active: Just now</p>
                        <p className="text-xs text-muted-foreground">Chrome on Windows</p>
                      </div>
                      <div className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                        Active
                      </div>
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Mobile App</p>
                        <p className="text-xs text-muted-foreground">Last active: 2 days ago</p>
                        <p className="text-xs text-muted-foreground">iOS 15.4</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                        Revoke
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Lock className="h-4 w-4 mr-2" />
                    Log Out All Devices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Account;
