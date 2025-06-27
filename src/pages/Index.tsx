
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SignupDialog from '@/components/SignupDialog';
import SearchFilterBar from '@/components/SearchFilterBar';
import PromotionalCampaigns from '@/components/PromotionalCampaigns';
import Chatbot from '@/components/Chatbot';
import HowItWorks from '@/components/home/HowItWorks';
import CustomerTestimonials from '@/components/home/CustomerTestimonials';
import NewsletterSection from '@/components/home/NewsletterSection';
import PromotionalPopup from '@/components/PromotionalPopup';

const Index: React.FC = () => {
  const [isSignupOpen, setIsSignupOpen] = React.useState(false);

  const handleAuthRequired = React.useCallback(() => {
    setIsSignupOpen(true);
  }, []);

  return (
    <PageLayout>
      {/* Filtro de busca */}
      <SearchFilterBar />
      
      {/* Chatbot central na home */}
      <div className="max-w-3xl mx-auto w-full mb-4">
        <Chatbot />
      </div>
      
      {/* Seção Como Funciona */}
      <HowItWorks />
      
      {/* Campanhas promocionais */}
      <PromotionalCampaigns />
      
      {/* Depoimentos de clientes */}
      <CustomerTestimonials />
      
      {/* Newsletter melhorada */}
      <NewsletterSection />
      
      {/* Pop-up promocional */}
      <PromotionalPopup />
      
      {/* Signup Dialog to handle authentication requests */}
      <SignupDialog 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
      />
    </PageLayout>
  );
};

export default Index;
