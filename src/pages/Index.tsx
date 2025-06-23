import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import TripPlannerSection from '@/components/home/TripPlannerSection';
import SignupDialog from '@/components/SignupDialog';

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
      {/* The Trip Planner Section is the only component on the home page */}
      <TripPlannerSection 
        onTripGenerated={handleTripGenerated}
        onAuthRequired={handleAuthRequired}
      />
      
      {/* Signup Dialog to handle authentication requests */}
      <SignupDialog 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
      />
    </PageLayout>
  );
};

export default Index;
