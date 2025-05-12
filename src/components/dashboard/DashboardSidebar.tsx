
import React from 'react';
import { Link } from 'react-router-dom';
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
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  // Navigation items
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Tools Library', icon: Building, path: '/dashboard/tools' },
    { name: 'My Subscription', icon: Settings, path: '/dashboard/subscription' },
    { name: 'Account', icon: User, path: '/dashboard/account' },
    { name: 'Support', icon: HelpCircle, path: '/dashboard/support' },
    { name: 'Fix a Tool', icon: Settings, path: '/dashboard/fix-tool' },
    { name: 'Download Extension', icon: Download, path: '/dashboard/extension' },
  ];

  return (
    <aside className={cn(
      "bg-secondary/30 backdrop-blur-md border-r border-secondary/60 h-screen flex flex-col transition-all duration-300",
      expanded ? "w-64" : "w-20",
      className
    )}>
      {/* Logo */}
      <div className={cn(
        "flex items-center justify-center p-5 border-b border-secondary/60",
        expanded ? "justify-between" : "justify-center"
      )}>
        {expanded ? (
          <Link to="/dashboard" className="text-xl font-bold text-gradient">OneTools.io</Link>
        ) : (
          <Link to="/dashboard" className="text-2xl font-bold text-primary">O</Link>
        )}
        
        {toggleExpanded && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleExpanded}
            className="hover:bg-secondary/60"
          >
            {expanded ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </Button>
        )}
      </div>
      
      {/* Nav items */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center py-3 px-3 rounded-md transition-colors hover:bg-primary/20",
                  expanded ? "justify-start" : "justify-center"
                )}
              >
                <item.icon className="h-5 w-5" />
                {expanded && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Logout */}
      <div className={cn(
        "p-4 border-t border-secondary/60",
        expanded ? "px-6" : "px-3"
      )}>
        <Link
          to="/logout"
          className={cn(
            "flex items-center py-3 px-3 rounded-md text-red-400 hover:bg-red-500/10 transition-colors",
            expanded ? "justify-start" : "justify-center"
          )}
        >
          <LogOut className="h-5 w-5" />
          {expanded && <span className="ml-3">Logout</span>}
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
