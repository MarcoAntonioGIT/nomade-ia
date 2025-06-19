
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OffersList from '@/components/offers/OffersList';

const OffersPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Ofertas e planos adicionais
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Aprimore sua experiência de viagem com nossos serviços adicionais e experiências exclusivas.
            </p>
          </div>
          
          <OffersList />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OffersPage;
