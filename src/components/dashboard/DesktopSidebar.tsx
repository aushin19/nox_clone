import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Building, 
  User, 
  Settings,
  Home, 
  LogOut,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Download,
  CreditCard,
  Wrench,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface DesktopSidebarProps {
  expanded: boolean;
  toggleExpanded: () => void;
}

const DesktopSidebar = ({ expanded, toggleExpanded }: DesktopSidebarProps) => {
  const { logout, user, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
    <aside className={cn(
      "hidden md:flex flex-col bg-background border-r h-screen transition-all duration-300 overflow-hidden",
      expanded ? "w-[280px]" : "w-[80px]"
    )}>
      {/* Logo */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b",
        expanded ? "justify-between" : "justify-center"
      )}>
        {expanded ? (
          <Link to="/dashboard" className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 mr-3">
              <span className="text-xl font-bold text-primary">O</span>
            </div>
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              OneTools.io
            </span>
          </Link>
        ) : (
          <Link to="/dashboard" className="flex items-center justify-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10">
              <span className="text-xl font-bold text-primary">O</span>
            </div>
          </Link>
        )}
        
        {expanded && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleExpanded}
            className="rounded-full hover:bg-secondary/20"
            aria-label="Collapse sidebar"
          >
            <ArrowLeft size={18} />
          </Button>
        )}
      </div>
      
      {/* Expand button when collapsed */}
      {!expanded && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleExpanded}
          className="mx-auto mt-4 rounded-full hover:bg-secondary/20"
          aria-label="Expand sidebar"
        >
          <ArrowRight size={18} />
        </Button>
      )}
      
      {/* Nav items */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto scrollbar-thin">
        {navGroups.map((group) => (
          <div key={group.name} className="mb-6">
            {expanded && (
              <h3 className="px-3 mb-2 text-xs uppercase tracking-wider text-muted-foreground/70 font-medium">
                {group.name}
              </h3>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center py-2 rounded-lg transition-all group relative",
                        active 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "hover:bg-secondary/10 text-muted-foreground hover:text-foreground",
                        expanded ? "px-3 justify-between" : "px-0 justify-center"
                      )}
                    >
                      <div className={cn(
                        "flex items-center", 
                        !expanded && "flex-col gap-1"
                      )}>
                        <div className={cn(
                          "flex items-center justify-center",
                          !expanded && "w-10 h-10 rounded-lg transition-colors",
                          !expanded && active ? "bg-primary/10" : !expanded && "group-hover:bg-secondary/10"
                        )}>
                          <item.icon className={cn(
                            "h-5 w-5 transition-transform", 
                            active ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                            !expanded && "group-hover:scale-110"
                          )} />
                        </div>
                        {expanded && <span className="ml-3">{item.name}</span>}
                        {!expanded && (
                          <span className="text-[10px] font-medium text-center max-w-[64px] line-clamp-1">
                            {item.name}
                          </span>
                        )}
                      </div>
                      
                      {expanded && active && (
                        <ChevronRight className="h-4 w-4 text-primary" />
                      )}
                      
                      {expanded && item.badge && !active && (
                        <Badge 
                          variant="default" 
                          className="text-[10px] px-1.5 py-0 h-auto bg-primary hover:bg-primary"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      
                      {!expanded && item.badge && (
                        <Badge 
                          variant="default" 
                          className="absolute -right-1 -top-1 w-2 h-2 p-0 min-w-0 min-h-0 flex items-center justify-center bg-primary hover:bg-primary"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      
      {/* User profile (expanded view) */}
      {expanded && (
        <div className="p-4 m-3 mt-auto rounded-xl bg-secondary/10 border border-secondary/20">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="h-9 w-9 border-2 border-background">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5 flex-1 min-w-0">
              <h4 className="text-sm font-medium truncate">
                {profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}`.trim() : profile?.username}
              </h4>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>
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
      )}
      
      {/* Collapsed logout */}
      {!expanded && (
        <div className="mt-auto mb-4 flex justify-center">
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      )}
    </aside>
  );
};

export default DesktopSidebar; 