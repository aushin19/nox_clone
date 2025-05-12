
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
  Wrench
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface QuickAccessButtonProps {
  icon: React.ElementType;
  title: string;
  link: string;
  color?: string;
}

const QuickAccessButton = ({ icon: Icon, title, link, color = "bg-primary/20" }: QuickAccessButtonProps) => {
  return (
    <Link to={link}>
      <Card className="h-full p-5 flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-md hover:shadow-primary/20 glass-card border-secondary/60">
        <div className={`p-4 rounded-md mb-3 ${color}`}>
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-sm font-medium text-center">{title}</h3>
      </Card>
    </Link>
  );
};

const QuickAccessGrid = () => {
  const quickAccessItems = [
    { icon: Building, title: 'Tools Library', link: '/dashboard/tools', color: 'bg-blue-500/20' },
    { icon: Settings, title: 'My Subscription', link: '/dashboard/subscription', color: 'bg-purple-500/20' },
    { icon: User, title: 'Account', link: '/dashboard/account', color: 'bg-green-500/20' },
    { icon: Download, title: 'Download Extension', link: '/dashboard/extension', color: 'bg-yellow-500/20' },
    { icon: HelpCircle, title: 'Support', link: '/dashboard/support', color: 'bg-red-500/20' },
    { icon: Megaphone, title: 'Announcements', link: '/dashboard/announcements', color: 'bg-indigo-500/20' },
    { icon: Info, title: 'FAQs', link: '/dashboard/faqs', color: 'bg-pink-500/20' },
    { icon: Wrench, title: 'Fix a Tool', link: '/dashboard/fix-tool', color: 'bg-orange-500/20' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {quickAccessItems.map((item) => (
        <QuickAccessButton
          key={item.title}
          icon={item.icon}
          title={item.title}
          link={item.link}
          color={item.color}
        />
      ))}
    </div>
  );
};

export default QuickAccessGrid;
