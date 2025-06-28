
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Calendar, Users } from 'lucide-react';

const OffersPage: React.FC = () => {
  const offers = [
    {
      id: 1,
      title: "Pacote Disney",
      subtitle: "15 DIAS / 14 NOITES",
      description: "Saindo de São Paulo",
      details: "Hotel + Aéreo + Ingressos",
      rating: 9.2,
      stars: 5,
      originalPrice: "R$ 5.999",
      finalPrice: "R$ 4.599",
      savings: "Economize R$1.400",
      image: "/offer-images/voos-disney.png",
      badge: "PACOTE COMPLETO",
      highlight: "Inclui ingressos para todos os parques"
    },
    {
      id: 2,
      title: "Europa Multi-destinos",
      subtitle: "21 DIAS / 20 NOITES",
      description: "Londres + Paris + Roma",
      details: "Hotel + Aéreo + Transfers",
      rating: 9.0,
      stars: 5,
      originalPrice: "R$ 7.850",
      finalPrice: "R$ 6.299",
      savings: "Economize R$1.551",
      image: "/offer-images/voos-europa.png",
      badge: "MULTI-DESTINOS",
      highlight: "3 países em uma única viagem"
    },
    {
      id: 3,
      title: "Fernando de Noronha",
      subtitle: "8 DIAS / 7 NOITES",
      description: "Saindo de Recife",
      details: "Pousada + Aéreo + Passeios",
      rating: 9.5,
      stars: 5,
      originalPrice: "R$ 3.499",
      finalPrice: "R$ 2.299",
      savings: "Economize R$1.200",
      image: "/offer-images/imagem-fernando-de-noronha.png",
      badge: "PARAÍSO NATURAL",
      highlight: "Inclui mergulho e trilhas"
    },
    {
      id: 4,
      title: "Pacotes para Porto Seguro",
      subtitle: "11 DIAS / 10 NOITES",
      description: "Saindo de São Paulo",
      details: "Hotel + Aéreo",
      rating: 8.3,
      stars: 4,
      originalPrice: "R$ 2.798",
      finalPrice: "R$ 1.980",
      savings: "Economize R$818",
      image: "/offer-images/imagem-fernando-de-noronha.png",
      badge: "PRAIA",
      highlight: "Melhor custo-benefício"
    },
    {
      id: 5,
      title: "Pacotes para Londres",
      subtitle: "12 DIAS / 11 NOITES",
      description: "Saindo de São Paulo",
      details: "Hotel + Aéreo + City Tour",
      rating: 8.7,
      stars: 4,
      originalPrice: "R$ 5.999",
      finalPrice: "R$ 4.199",
      savings: "Economize R$1.800",
      image: "/offer-images/imagem-londres.png",
      badge: "CULTURA",
      highlight: "Inclui passeios históricos"
    },
    {
      id: 6,
      title: "Passagens Aéreas Promocionais",
      subtitle: "IDA E VOLTA",
      description: "Vários destinos nacionais",
      details: "Apenas passagem aérea",
      rating: 8.0,
      stars: 4,
      originalPrice: "R$ 1.200",
      finalPrice: "R$ 799",
      savings: "Economize R$401",
      image: "/offer-images/passagens-aereas.png",
      badge: "PASSAGEM",
      highlight: "Flexibilidade de datas"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-nomade-turquoise to-nomade-orange py-16">
          <div className="container">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                Ofertas Especiais
              </h1>
              <p className="text-xl md:text-2xl mb-2">
                Descubra destinos incríveis com descontos imperdíveis
              </p>
              <p className="text-lg opacity-90">
                Pacotes completos e passagens com os melhores preços do mercado
              </p>
            </div>
          </div>
        </section>

        {/* Offers Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offers.map((offer) => (
                <Card key={offer.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg bg-white">
                  <div className="relative">
                    <img 
                      src={offer.image} 
                      alt={offer.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-gray-800 text-white px-4 py-1 rounded text-sm font-bold">
                        {offer.subtitle}
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <Badge variant="secondary" className="bg-nomade-light-turquoise text-nomade-turquoise mb-2 font-semibold">
                        {offer.badge}
                      </Badge>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {offer.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-nomade-turquoise text-white px-2 py-1 rounded text-sm font-bold">
                        {offer.rating}
                      </div>
                      <div className="flex">
                        {[...Array(offer.stars)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                        ))}
                      </div>
                    </div>

                    <div className="text-gray-600 mb-2 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {offer.description}
                    </div>

                    <div className="text-gray-600 mb-3">
                      {offer.details}
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg mb-3 border border-green-200">
                      <div className="text-green-700 font-semibold text-sm">
                        ✓ {offer.highlight}
                      </div>
                    </div>

                    <div className="bg-nomade-light-turquoise p-3 rounded-lg mb-4">
                      <div className="text-nomade-turquoise font-semibold text-sm">
                        {offer.savings}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">
                        Preço final por pessoa
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-gray-400 line-through">
                          {offer.originalPrice}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {offer.finalPrice}
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

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Não encontrou o que procurava?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Nossa IA pode criar um roteiro personalizado para qualquer destino. 
              Conte-nos seus sonhos de viagem e deixe a magia acontecer!
            </p>
            <Button 
              size="lg" 
              className="bg-nomade-orange hover:bg-nomade-orange/90 text-white px-8 py-3"
              onClick={() => window.location.href = '/planner'}
            >
              Criar Roteiro Personalizado
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default OffersPage;
