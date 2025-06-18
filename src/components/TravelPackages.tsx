
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Clock } from 'lucide-react';

interface Package {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  nights: string;
  rating?: number;
  originalPrice: string;
  finalPrice: string;
  savings: string;
  image: string;
  includes: string;
}

const TravelPackages = () => {
  const packages: Package[] = [
    {
      id: 1,
      title: 'Pacotes para Porto Seguro',
      subtitle: 'Saindo de São Paulo',
      duration: '11 DIAS',
      nights: '10 NOITES',
      originalPrice: 'R$ 1.454',
      finalPrice: 'R$ 1.508',
      savings: 'Economize R$106',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      includes: 'Hotel + Aéreo'
    },
    {
      id: 2,
      title: 'Pacotes para Maceió',
      subtitle: 'Saindo de São Paulo',
      duration: '11 DIAS',
      nights: '10 NOITES',
      rating: 8.3,
      originalPrice: 'R$ 2.569',
      finalPrice: 'R$ 2.210',
      savings: 'Economize R$359',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      includes: 'Hotel + Aéreo'
    },
    {
      id: 3,
      title: 'Pacotes para Rio de Janeiro',
      subtitle: 'Saindo de São Paulo',
      duration: '8 DIAS',
      nights: '7 NOITES',
      rating: 7.2,
      originalPrice: 'R$ 1.286',
      finalPrice: 'R$ 629',
      savings: 'Economize R$657',
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      includes: 'Hotel + Aéreo'
    },
    {
      id: 4,
      title: 'Pacotes para Gramado',
      subtitle: 'Saindo de São Paulo',
      duration: '4 DIAS',
      nights: '3 NOITES',
      rating: 9.2,
      originalPrice: 'R$ 1.494',
      finalPrice: 'R$ 1.151',
      savings: 'Economize R$293',
      image: 'https://images.unsplash.com/photo-1518139289178-863fe67d5337?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      includes: 'Hotel + Aéreo'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            PACOTES DE VIAGEM MAIS BUSCADOS
          </h2>
          <p className="text-gray-600">Parcele em até 10x iguais!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {pkg.duration} / {pkg.nights}
                </div>
                {pkg.rating && (
                  <div className="absolute top-4 right-4 bg-nomade-orange text-white px-2 py-1 rounded font-bold flex items-center">
                    {pkg.rating}
                    <div className="flex ml-1">
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">PACOTE</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{pkg.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{pkg.subtitle}</p>
                <p className="text-gray-600 text-sm mb-4">{pkg.includes}</p>
                
                <div className="space-y-2">
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                    {pkg.savings}
                  </div>
                  <div className="text-sm text-gray-500">Preço final por pessoa</div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-gray-400 line-through text-sm">{pkg.originalPrice}</span>
                  </div>
                  <div className="text-2xl font-bold text-nomade-orange">{pkg.finalPrice}</div>
                  <div className="text-xs text-gray-500">Taxas e impostos incluídos</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelPackages;
