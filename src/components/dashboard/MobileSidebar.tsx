import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Building, 
  User, 
  Home, 
  LogOut,
  HelpCircle,
  X,
  Download,
  CreditCard,
  Wrench,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ open, onClose }: MobileSidebarProps) => {
  const { logout, user, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!open) return null;

  // Navigation items
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Tools Library', icon: Building, path: '/dashboard/tools', badge: 'NEW' },
    { name: 'My Subscription', icon: CreditCard, path: '/dashboard/subscription' },
    { name: 'Account', icon: User, path: '/dashboard/account' },
    { name: 'Support', icon: HelpCircle, path: '/dashboard/support' },
    { name: 'Fix a Tool', icon: Wrench, path: '/dashboard/fix-tool' },
    { name: 'Download Extension', icon: Download, path: '/dashboard/extension' },
  ];

  // Groups for better organization
  const navGroups = [
    {
      name: 'Main',
      items: navItems.slice(0, 3)
    },
    {
      name: 'User',
      items: navItems.slice(3, 5)
    },
    {
      name: 'Extras',
      items: navItems.slice(5)
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Get user's initials for avatar fallback
  const getInitials = () => {
    if (profile?.first_name) {
      return `${profile.first_name.charAt(0)}${profile.last_name ? profile.last_name.charAt(0) : ''}`;
    }
    return profile?.username?.charAt(0).toUpperCase() || 'U';
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="md:hidden fixed left-0 top-0 z-50 w-[280px] h-screen bg-background flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b">
          <Link to="/dashboard" className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 mr-3">
              <span className="text-xl font-bold text-primary">O</span>
            </div>
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              OneTools.io
            </span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="rounded-full hover:bg-secondary/20"
          >
            <X size={18} />
          </Button>
        </div>

        {/* User profile */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-background">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium truncate">
                {profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}`.trim() : profile?.username}
              </h4>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-6 px-4 overflow-y-auto scrollbar-thin">
          {navGroups.map((group) => (
            <div key={group.name} className="mb-6">
              <h3 className="px-2 mb-3 text-xs uppercase tracking-wider text-muted-foreground/70 font-medium">
                {group.name}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className={cn(
                          "flex items-center justify-between py-2.5 px-3 rounded-lg transition-all",
                          active 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "hover:bg-secondary/10 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <div className="flex items-center">
                          <div className={cn(
                            "flex items-center justify-center w-8 h-8",
                            active && "text-primary"
                          )}>
                            <item.icon className={cn(
                              "h-5 w-5", 
                              active ? "text-primary" : "text-muted-foreground"
                            )} />
                          </div>
                          <span className="ml-3 font-medium">{item.name}</span>
                        </div>
                        
                        <div className="flex items-center">
                          {item.badge && (
                            <Badge 
                              variant="default" 
                              className="mr-2 text-[10px] px-1.5 py-0 h-auto bg-primary hover:bg-primary"
                            >
                              {item.badge}
                            </Badge>
                          )}
                          
                          {active && (
                            <ChevronRight className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Logout button */}
        <div className="p-4 m-4 mt-auto rounded-xl bg-secondary/10 border border-secondary/20">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-lg"
            size="sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar; 