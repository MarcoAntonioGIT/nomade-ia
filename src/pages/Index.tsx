import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import TripPlannerSection from '@/components/home/TripPlannerSection';
import SignupDialog from '@/components/SignupDialog';
import SearchFilterBar from '@/components/SearchFilterBar';
import PromotionalCampaigns from '@/components/PromotionalCampaigns';
import Chatbot from '@/components/Chatbot';

const Index: React.FC = () => {
  const [isSignupOpen, setIsSignupOpen] = React.useState(false);

  const handleAuthRequired = React.useCallback(() => {
    setIsSignupOpen(true);
  }, []);

  // Dummy handler as the original functionality was tied to a different flow
  const handleTripGenerated = () => {
    // This can be adapted later if needed
  };

  return (
    <PageLayout>
      {/* Filtro de busca */}
      <SearchFilterBar />
      {/* Banner e hero do planner */}
      <TripPlannerSection />
      {/* Chatbot central na home */}
      <div className="max-w-3xl mx-auto w-full my-12">
        <Chatbot />
      </div>
      {/* Campanhas promocionais */}
      <PromotionalCampaigns />
      {/* Signup Dialog to handle authentication requests */}
      <SignupDialog 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
      />
    </PageLayout>
  );
};

export default Index;
