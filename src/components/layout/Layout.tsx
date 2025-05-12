
import React from 'react';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main
        className={cn(
          'ml-16 md:ml-64 p-4 md:p-8 transition-all duration-300',
          className
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
