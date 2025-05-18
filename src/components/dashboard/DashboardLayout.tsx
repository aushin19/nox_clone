import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Search, Bell, Sun, Moon, User, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import MobileSidebar from './MobileSidebar';
import DesktopSidebar from './DesktopSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, profile, logout } = useAuth();
  
  // Get user's initials for avatar fallback
  const getInitials = () => {
    if (profile?.first_name) {
      return `${profile.first_name.charAt(0)}${profile.last_name ? profile.last_name.charAt(0) : ''}`;
    }
    return profile?.username?.charAt(0).toUpperCase() || 'U';
  };
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
    <div className="min-h-screen flex bg-background text-foreground overflow-x-hidden">
      {/* Desktop sidebar - completely separate component */}
      <DesktopSidebar expanded={sidebarExpanded} toggleExpanded={() => setSidebarExpanded(!sidebarExpanded)} />
      
      {/* Mobile sidebar with overlay - completely separate component */}
      <MobileSidebar open={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-md">
          <div className="px-4 md:px-6 h-16 flex items-center justify-between">
            {/* Left section */}
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden hover:bg-secondary/20"
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              {/* Desktop logo area with toggle */}
              <div className="hidden md:flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSidebarExpanded(!sidebarExpanded)}
                  className="mr-3 hover:bg-secondary/20 relative"
                  aria-label="Toggle sidebar"
                >
                  <Menu className="h-5 w-5" />
                  <span className={`absolute -right-1 -top-1 w-2 h-2 rounded-full bg-primary ${sidebarExpanded ? 'opacity-0' : 'opacity-100'}`}></span>
                </Button>
              </div>
              
              {/* Search bar */}
              <div className="relative hidden sm:flex items-center w-full max-w-md">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search anything..."
                    className="pl-10 pr-4 h-9 bg-secondary/10 border-secondary/30 focus-visible:ring-primary/30 w-full rounded-full"
                  />
                </div>
              </div>
            </div>
            
            {/* Right section - profile, notifications, etc. */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/20">
                <Bell className="h-5 w-5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/20">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2 rounded-full hover:bg-secondary/20" size="sm">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">{getInitials()}</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-medium line-clamp-1">
                        {profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}` : profile?.username}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium">{profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}` : profile?.username}</span>
                      <span className="text-xs text-muted-foreground">{user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
