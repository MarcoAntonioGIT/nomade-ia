
import React from 'react';
import { Badge } from '@/components/ui/badge';

const PromotionalCampaigns: React.FC = () => {
  const campaigns = [
    {
      id: 1,
      title: "Disney Orlando",
      subtitle: "Pacotes completos",
      description: "Voos + hospedagem com desconto especial",
      price: "A partir de R$ 2.999",
      discount: "30% OFF",
      image: "/offer-images/imagem-disney.png",
      badge: "Oferta Limitada"
    },
    {
      id: 2,
      title: "Fernando de Noronha",
      subtitle: "Paraíso brasileiro",
      description: "Pacote completo com voos e pousada",
      price: "A partir de R$ 1.899",
      discount: "25% OFF",
      image: "/offer-images/imagem-fernando-de-noronha.png",
      badge: "Imperdível"
    },
    {
      id: 3,
      title: "Londres",
      subtitle: "Europa clássica",
      description: "Voos diretos + hotel no centro",
      price: "A partir de R$ 3.499",
      discount: "20% OFF",
      image: "/offer-images/imagem-londres.png",
      badge: "Últimas vagas"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ofertas Especiais
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra nossos pacotes promocionais com descontos imperdíveis para os destinos mais procurados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={campaign.image} 
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="destructive" className="bg-red-500 text-white">
                    {campaign.badge}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {campaign.discount}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {campaign.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {campaign.subtitle}
                </p>
                <p className="text-gray-600 mb-4">
                  {campaign.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-nomade-orange">
                      {campaign.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      por pessoa
                    </p>
                  </div>
                  
                  <button className="bg-[#053757] hover:bg-[#064468] text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                    Saiba Mais
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalCampaigns;
