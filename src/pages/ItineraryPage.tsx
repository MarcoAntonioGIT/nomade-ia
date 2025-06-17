
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripItinerary from '@/components/planner/TripItinerary';

const ItineraryPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container">
          <TripItinerary />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ItineraryPage;
