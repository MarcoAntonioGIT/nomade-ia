
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripSummary from '@/components/planner/TripSummary';

const SummaryPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Resumo das preferências
            </h1>
            <p className="text-muted-foreground mb-8">
              Verifique os detalhes da sua viagem antes de gerar o roteiro personalizado.
            </p>
            
            <TripSummary />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SummaryPage;
