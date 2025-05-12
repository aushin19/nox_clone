
import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Desktop sidebar */}
      <DashboardSidebar 
        expanded={sidebarExpanded} 
        toggleExpanded={() => setSidebarExpanded(!sidebarExpanded)} 
        className="hidden md:block"
      />
      
      {/* Mobile sidebar (overlay) */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileSidebarOpen(false)} />
      )}
      <DashboardSidebar 
        expanded={true} 
        className={`fixed z-50 transition-transform duration-300 md:hidden ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      />
      
      {/* Main content */}
      <div className="flex-1">
        {/* Mobile header */}
        <div className="md:hidden p-4 border-b border-secondary/60 flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileSidebarOpen(true)}
            className="mr-3"
          >
            <Menu />
          </Button>
          <span className="text-xl font-bold text-gradient">OneTools.io</span>
        </div>
        
        {/* Page content */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
