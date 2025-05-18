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
  Info,
  ArrowLeft,
  ArrowRight,
  Download,
  ChevronRight,
  CreditCard,
  Zap,
  Wrench
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface DashboardSidebarProps {
  expanded?: boolean;
  toggleExpanded?: () => void;
  className?: string;
}

const DashboardSidebar = ({ 
  expanded = true, 
  toggleExpanded,
  className = ""
}: DashboardSidebarProps) => {
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
      "bg-secondary/30 backdrop-blur-md border-r border-secondary/60 h-screen flex flex-col transition-all duration-300",
      expanded ? "w-64" : "w-20",
      className
    )}>
      {/* Logo */}
      <div className={cn(
        "flex items-center p-5 border-b border-secondary/60",
        expanded ? "justify-between" : "justify-center"
      )}>
        {expanded ? (
          <Link to="/dashboard" className="text-xl font-bold text-gradient">OneTools.io</Link>
        ) : (
          <Link to="/dashboard" className="text-2xl font-bold text-primary">O</Link>
        )}
        
        {toggleExpanded && (
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleExpanded}
            className="border-secondary/60 hover:bg-secondary/30 hover:text-primary"
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {expanded ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </Button>
        )}
      </div>
      
      {/* User profile mini (only visible when collapsed) */}
      {!expanded && (
        <div className="py-4 flex justify-center border-b border-secondary/60">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile?.avatar_url || undefined} />
            <AvatarFallback className="bg-primary/20 text-primary">{getInitials()}</AvatarFallback>
          </Avatar>
        </div>
      )}
      
      {/* Nav items */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin">
        {navGroups.map((group) => (
          <div key={group.name} className="mb-6">
            {expanded && (
              <h3 className="px-6 mb-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                {group.name}
              </h3>
            )}
            <ul className="space-y-1 px-3">
              {group.items.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center py-2 px-3 rounded-md transition-colors group relative",
                        active 
                          ? "bg-primary/20 text-primary font-medium" 
                          : "hover:bg-secondary/60 text-muted-foreground hover:text-foreground",
                        expanded ? "justify-between" : "justify-center"
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon className={cn("h-5 w-5", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                        {expanded && <span className="ml-3">{item.name}</span>}
                      </div>
                      
                      {expanded && item.badge && (
                        <Badge 
                          variant="default" 
                          className="text-[10px] px-1.5 py-0 h-auto bg-primary/80 hover:bg-primary/80"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      
                      {!expanded && item.badge && (
                        <Badge 
                          variant="default" 
                          className="absolute -right-1 -top-1 text-[10px] px-1 py-0 min-w-0 min-h-0 h-auto bg-primary/80 hover:bg-primary/80"
                        >
                          •
                        </Badge>
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
        <div className="p-4 border-t border-secondary/60">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar>
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/20 text-primary">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <h4 className="text-sm font-medium">
                {profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}`.trim() : profile?.username}
              </h4>
              <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                {user?.email}
              </p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-red-400 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      )}
      
      {/* Collapsed logout */}
      {!expanded && (
        <div className="p-3 border-t border-secondary/60 flex justify-center">
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="icon"
            className="text-red-400 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      )}
    </aside>
  );
};

export default DashboardSidebar;
