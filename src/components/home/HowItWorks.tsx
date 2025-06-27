
import React from 'react';
import { MessageCircle, Package, CreditCard } from 'lucide-react';

const steps = [
  {
    icon: <MessageCircle className="w-12 h-12 text-nomade-orange mb-4" />,
    title: 'Converse com a IA',
    description: 'Conte seus sonhos de viagem para nossa inteligência artificial personalizada.',
  },
  {
    icon: <Package className="w-12 h-12 text-nomade-turquoise mb-4" />,
    title: 'Escolha seu pacote',
    description: 'Receba opções de pacotes personalizados com as melhores ofertas do mercado.',
  },
  {
    icon: <CreditCard className="w-12 h-12 text-nomade-navy mb-4" />,
    title: 'Finalize sua compra',
    description: 'Aprove seu roteiro e receba todos os detalhes para embarcar sem preocupação.',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-nomade-navy">
            Como funciona
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Em apenas 3 passos simples, você terá sua viagem dos sonhos planejada pela nossa IA
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 relative z-10">
                <div className="relative mb-4">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 bg-nomade-orange text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-nomade-navy">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
              
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full transform -translate-y-1/2 z-0" style={{ width: '2rem', marginLeft: '1rem', marginRight: '1rem' }}>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-nomade-turquoise to-nomade-orange relative">
                    <div className="absolute -right-1 -top-1 w-2 h-2 bg-nomade-orange rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
