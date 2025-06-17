
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripForm from '@/components/planner/TripForm';

const PlannerPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Planeje sua viagem
            </h1>
            <p className="text-muted-foreground mb-8">
              Preencha o formulário abaixo com suas preferências e nossa IA criará um roteiro personalizado para você.
            </p>
            
            <TripForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlannerPage;
