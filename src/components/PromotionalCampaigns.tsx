
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Calendar, Users } from 'lucide-react';

const PromotionalCampaigns: React.FC = () => {
  const campaigns = [
    {
      id: 1,
      title: "Pacotes para Porto Seguro",
      subtitle: "11 DIAS / 10 NOITES",
      description: "Saindo de São Paulo",
      details: "Hotel + Aéreo",
      rating: 8.3,
      stars: 3,
      originalPrice: "R$ 2.798",
      finalPrice: "R$ 1.980",
      savings: "Economize R$818",
      image: "/offer-images/imagem-fernando-de-noronha.png",
      badge: "PACOTE"
    },
    {
      id: 2,
      title: "Pacotes para Fernando de Noronha",
      subtitle: "8 DIAS / 7 NOITES",
      description: "Saindo de Recife",
      details: "Pousada + Aéreo",
      rating: 9.1,
      stars: 4,
      originalPrice: "R$ 3.499",
      finalPrice: "R$ 2.299",
      savings: "Economize R$1.200",
      image: "/offer-images/imagem-fernando-de-noronha.png",
      badge: "PACOTE"
    },
    {
      id: 3,
      title: "Pacotes para Londres",
      subtitle: "12 DIAS / 11 NOITES",
      description: "Saindo de São Paulo",
      details: "Hotel + Aéreo",
      rating: 8.7,
      stars: 4,
      originalPrice: "R$ 5.999",
      finalPrice: "R$ 4.199",
      savings: "Economize R$1.800",
      image: "/offer-images/imagem-londres.png",
      badge: "PACOTE"
    }
  ];

  return (
    <section className="py-16 bg-white">
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
            <Card key={campaign.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
              <div className="relative">
                <img 
                  src={campaign.image} 
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-gray-800 text-white px-4 py-1 rounded text-sm font-bold">
                    {campaign.subtitle}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-3">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 mb-2">
                    {campaign.badge}
                  </Badge>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {campaign.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-nomade-turquoise text-white px-2 py-1 rounded text-sm font-bold">
                    {campaign.rating}
                  </div>
                  <div className="flex">
                    {[...Array(campaign.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                </div>

                <div className="text-gray-600 mb-2 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {campaign.description}
                </div>

                <div className="text-gray-600 mb-4">
                  {campaign.details}
                </div>

                <div className="bg-nomade-light-turquoise p-3 rounded-lg mb-4">
                  <div className="text-nomade-turquoise font-semibold text-sm">
                    {campaign.savings}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Preço final por pessoa
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-gray-400 line-through">
                      {campaign.originalPrice}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {campaign.finalPrice}
                  </div>
                  <p className="text-xs text-gray-500">
                    Taxas e impostos incluídos
                  </p>
                </div>
                
                <Button className="w-full bg-nomade-orange hover:bg-nomade-orange/90 text-white">
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalCampaigns;
