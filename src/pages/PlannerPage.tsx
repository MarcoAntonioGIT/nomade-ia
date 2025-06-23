import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripPlannerSection from '@/components/home/TripPlannerSection';
import { useAuth } from '@/contexts/AuthContext';
import SignupDialog from '@/components/SignupDialog';

const PlannerPage = () => {
  const [isSignupOpen, setIsSignupOpen] = React.useState(false);
  const { user } = useAuth();
  
  const handleAuthRequired = () => {
    if (!user) {
      setIsSignupOpen(true);
    }
  };

  const handleTripGenerated = () => {
    // The navigation is handled inside TripPlannerSection, so this can be empty.
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <TripPlannerSection 
          onTripGenerated={handleTripGenerated}
          onAuthRequired={handleAuthRequired}
        />
      </main>
      
      <Footer />
      
      <SignupDialog 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
      />
    </div>
  );
};

export default PlannerPage;
