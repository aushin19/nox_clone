import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  User, 
  Settings, 
  Download,
  HelpCircle,
  Info,
  Megaphone,
  Wrench,
  Zap,
  LineChart,
  Users,
  Palette,
  Code,
  Terminal,
  Lock,
  ChevronRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface QuickAccessButtonProps {
  icon: React.ElementType;
  title: string;
  link: string;
  color?: string;
  iconColor?: string;
  bgColor?: string;
  isPro?: boolean;
}

const QuickAccessButton = ({ 
  icon: Icon, 
  title, 
  link, 
  color = "from-blue-500/20 to-blue-600/20", 
  iconColor = "text-blue-500",
  bgColor = "bg-blue-500/5",
  isPro = false 
}: QuickAccessButtonProps) => {
  return (
    <Link to={link}>
      <Card className="relative h-full p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] border border-secondary/20 overflow-hidden group rounded-xl">
        <div className="flex flex-col">
          <div className={cn(
            "p-3 mb-4 rounded-lg w-12 h-12 flex items-center justify-center", 
            bgColor
          )}>
            <Icon className={cn("h-6 w-6 transition-transform group-hover:scale-110", iconColor)} />
          </div>
          
          <h3 className="text-base font-semibold mb-1 line-clamp-1">{title}</h3>
          <div className="text-xs text-muted-foreground mb-3">
            Click to access
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className={cn(
            "h-1.5 w-12 rounded-full opacity-70",
            `bg-gradient-to-r ${color}`
          )} />
          
          <div className="text-muted-foreground rounded-full p-1 group-hover:bg-secondary/20 group-hover:text-foreground transition-colors">
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
        
        {isPro && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
            PRO
          </div>
        )}
      </Card>
    </Link>
  );
};

const QuickAccessGrid = () => {
  const quickAccessItems = [
    { 
      icon: Building, 
      title: 'Tools Library', 
      link: '/dashboard/tools', 
      color: 'from-blue-500/20 to-blue-600/20',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-500/5'
    },
    { 
      icon: Palette, 
      title: 'Image Generator', 
      link: '/dashboard/image-generator', 
      color: 'from-purple-500/20 to-purple-600/20',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-500/5',
      isPro: true 
    },
    { 
      icon: Code, 
      title: 'Code Assistant', 
      link: '/dashboard/code-assistant', 
      color: 'from-green-500/20 to-green-600/20',
      iconColor: 'text-green-500',
      bgColor: 'bg-green-500/5',
      isPro: true 
    },
    { 
      icon: Lock, 
      title: 'Password Manager', 
      link: '/dashboard/password-manager', 
      color: 'from-yellow-500/20 to-amber-600/20',
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-500/5' 
    },
    { 
      icon: HelpCircle, 
      title: 'Support Center', 
      link: '/dashboard/support', 
      color: 'from-red-500/20 to-red-600/20',
      iconColor: 'text-red-500',
      bgColor: 'bg-red-500/5' 
    },
    { 
      icon: Terminal, 
      title: 'Command Center', 
      link: '/dashboard/command-center', 
      color: 'from-indigo-500/20 to-indigo-600/20',
      iconColor: 'text-indigo-500',
      bgColor: 'bg-indigo-500/5',
      isPro: true 
    },
    { 
      icon: Users, 
      title: 'Team Management', 
      link: '/dashboard/team', 
      color: 'from-pink-500/20 to-pink-600/20',
      iconColor: 'text-pink-500',
      bgColor: 'bg-pink-500/5' 
    },
    { 
      icon: Wrench, 
      title: 'Fix a Tool', 
      link: '/dashboard/fix-tool', 
      color: 'from-orange-500/20 to-orange-600/20',
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-500/5'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {quickAccessItems.map((item) => (
        <QuickAccessButton
          key={item.title}
          icon={item.icon}
          title={item.title}
          link={item.link}
          color={item.color}
          iconColor={item.iconColor}
          bgColor={item.bgColor}
          isPro={item.isPro}
        />
      ))}
    </div>
  );
};

export default QuickAccessGrid;
