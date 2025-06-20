import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { DebugPanel } from '@/components/ui/debug-panel';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavbar?: boolean;
  showFooter?: boolean;
  showDebug?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className = '',
  showNavbar = true,
  showFooter = true,
  showDebug = import.meta.env.MODE === 'development',
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      
      <main className={`flex-grow ${className}`}>
        {children}
      </main>
      
      {showFooter && <Footer />}
      
      {showDebug && <DebugPanel />}
    </div>
  );
};

export default PageLayout; 