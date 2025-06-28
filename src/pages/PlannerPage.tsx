
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import TripPlannerSection from '@/components/home/TripPlannerSection';

const PlannerPage = () => {
  return (
    <PageLayout>
      <TripPlannerSection 
        onTripGenerated={() => {}}
        onAuthRequired={() => {}}
      />
    </PageLayout>
  );
};

export default PlannerPage;
