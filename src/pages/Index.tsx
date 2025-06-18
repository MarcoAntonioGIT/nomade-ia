
import React from 'react';
import Navbar from '@/components/Navbar';
import CategoryNavbar from '@/components/CategoryNavbar';
import SearchSection from '@/components/SearchSection';
import OffersGrid from '@/components/OffersGrid';
import TravelPackages from '@/components/TravelPackages';
import DomesticFlights from '@/components/DomesticFlights';
import Footer from '@/components/Footer';

const Index = () => {
  const promoOffers = [
    {
      id: 1,
      title: 'Passagens Aéreas',
      subtitle: 'a partir de',
      price: 'R$ 188',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      tag: 'OFERTAS DA GOL',
      buttonText: 'CONFIRA >>',
      color: '#1e40af'
    },
    {
      id: 2,
      title: 'Voos América do Sul',
      subtitle: 'com até',
      price: '15% OFF',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      tag: 'Use o cupom:',
      discount: 'VIAJA15SKY',
      buttonText: 'APROVEITE',
      color: '#7c3aed'
    },
    {
      id: 3,
      title: 'Ingressos SeaWorld',
      subtitle: 'Visite 3 parques com refeição grátis com até',
      price: 'R$ 350 OFF',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      tag: 'Use o cupom:',
      discount: 'VIAJA10SEAWORLD',
      buttonText: 'GARANTA JÁ',
      color: '#0891b2'
    },
    {
      id: 4,
      title: 'Compare seu Pacote de Viagem',
      subtitle: 'pelo Site ou App',
      price: '5% OFF',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      tag: 'e ganhe',
      discount: 'pagando no PIX!',
      buttonText: 'COMPARAR',
      color: '#dc2626'
    }
  ];

  const internationalOffers = [
    {
      id: 1,
      title: 'Voo para Madrid',
      subtitle: 'Saindo de São Paulo',
      price: 'R$ 3.240',
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      tag: 'Oferta Imbatível',
      buttonText: 'Ida e Volta',
      color: '#1e40af'
    },
    {
      id: 2,
      title: 'Porto + Madrid',
      subtitle: 'Saindo de São Paulo',
      price: 'R$ 3.633',
      image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      tag: 'Oferta Imbatível',
      buttonText: 'Ida e Volta',
      color: '#1e40af'
    },
    {
      id: 3,
      title: 'Voo para Lisboa',
      subtitle: 'Saindo de São Paulo',
      price: 'R$ 3.330',
      image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      tag: 'Oferta Imbatível',
      buttonText: 'Ida e Volta',
      color: '#1e40af'
    },
    {
      id: 4,
      title: 'Lisboa + Barcelona',
      subtitle: 'Saindo de São Paulo',
      price: 'R$ 3.760',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      tag: 'Oferta Imbatível',
      buttonText: 'Ida e Volta',
      color: '#1e40af'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <CategoryNavbar />
      <SearchSection />
      
      <OffersGrid 
        title="OFERTAS ESPECIAIS"
        offers={promoOffers}
      />
      
      <OffersGrid 
        title="PASSAGENS AÉREAS"
        subtitle="Promoções encontradas nas últimas 12h!"
        offers={internationalOffers}
      />
      
      <TravelPackages />
      
      <DomesticFlights />
      
      {/* Trust Section */}
      <section className="py-12 bg-blue-600">
        <div className="container">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Canais Oficiais</h3>
                <p className="text-lg">Nomade IA</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg">⚠️ Conheça nossos canais oficiais.</p>
              <p className="text-yellow-300 font-medium">Evite perfis e sites falsos.</p>
            </div>
            <button className="bg-white/20 border border-white text-white px-6 py-3 rounded-full hover:bg-white/30 transition-colors">
              Saiba mais
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
