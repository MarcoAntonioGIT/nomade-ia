
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SearchFilterBar from '@/components/SearchFilterBar';
import PromotionalCampaigns from '@/components/PromotionalCampaigns';
import Chatbot from '@/components/Chatbot';
import HowItWorks from '@/components/home/HowItWorks';
import CustomerTestimonials from '@/components/home/CustomerTestimonials';
import NewsletterSection from '@/components/home/NewsletterSection';
import PromotionalPopup from '@/components/PromotionalPopup';

const Index: React.FC = () => {
  return (
    <PageLayout>
      <SearchFilterBar />
      
      <div className="max-w-3xl mx-auto w-full mb-4">
        <Chatbot />
      </div>
      
      <HowItWorks />
      <PromotionalCampaigns />
      <CustomerTestimonials />
      <NewsletterSection />
      <PromotionalPopup />
    </PageLayout>
  );
};

export default Index;
