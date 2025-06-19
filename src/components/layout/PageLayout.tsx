import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavbar?: boolean;
  showFooter?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className = '',
  showNavbar = true,
  showFooter = true,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      
      <main className={`flex-grow ${className}`}>
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default PageLayout; 