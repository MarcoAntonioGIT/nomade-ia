
import React from 'react';
import { Plane, Brain, Package, CreditCard } from 'lucide-react';

const steps = [
  {
    icon: <Plane className="w-12 h-12 text-nomade-orange mb-4" />,
    title: 'Escolha seu destino',
    description: 'Selecione para onde você quer viajar e suas preferências de viagem.',
  },
  {
    icon: <Brain className="w-12 h-12 text-nomade-turquoise mb-4" />,
    title: 'IA monta seu roteiro',
    description: 'Nossa inteligência artificial personalizada cria o roteiro perfeito para você.',
  },
  {
    icon: <Package className="w-12 h-12 text-nomade-navy mb-4" />,
    title: 'Veja os pacotes sugeridos',
    description: 'Receba opções de pacotes personalizados com as melhores ofertas do mercado.',
  },
  {
    icon: <CreditCard className="w-12 h-12 text-nomade-orange mb-4" />,
    title: 'Finalize sua compra',
    description: 'Aprove seu roteiro e receba todos os detalhes para embarcar sem preocupação.',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-nomade-navy">
            Como funciona
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Em apenas 4 passos simples, você terá sua viagem dos sonhos planejada pela nossa IA
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
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
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-nomade-turquoise to-nomade-orange"></div>
                  <div className="w-2 h-2 bg-nomade-orange rounded-full absolute -right-1 -top-0.75"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-nomade-navy text-white px-6 py-3 rounded-full">
            <Brain className="w-5 h-5" />
            <span className="font-semibold">🔮 IA que entende o seu estilo de viagem</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
