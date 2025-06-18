
import React from 'react';
import { Button } from '@/components/ui/button';

interface Flight {
  id: number;
  destination: string;
  origin: string;
  airline: string;
  price: string;
  image: string;
  badge?: string;
}

const DomesticFlights = () => {
  const flights: Flight[] = [
    {
      id: 1,
      destination: 'Voos para Rio de Janeiro',
      origin: 'Saindo de São Paulo',
      airline: 'Por Gol',
      price: 'R$ 378',
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      badge: 'Só ida'
    },
    {
      id: 2,
      destination: 'Voos para Recife',
      origin: 'Saindo de São Paulo',
      airline: 'Por Azul',
      price: 'R$ 766',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      badge: 'Só ida'
    },
    {
      id: 3,
      destination: 'Voos para Salvador',
      origin: 'Saindo de São Paulo',
      airline: 'Por Gol',
      price: 'R$ 746',
      image: 'https://images.unsplash.com/photo-1548618447-bf1b5d8b2394?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      badge: 'Só ida'
    },
    {
      id: 4,
      destination: 'Voos para Fortaleza',
      origin: 'Saindo de São Paulo',
      airline: 'Por LATAM Airlines Group',
      price: 'R$ 1.212',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      badge: 'Só ida'
    }
  ];

  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            TRECHOS NACIONAIS MAIS BUSCADOS
          </h2>
          <p className="text-gray-600">Parcele em até 10x iguais! Viaja que dá!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {flights.map((flight) => (
            <div key={flight.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-40">
                <img
                  src={flight.image}
                  alt={flight.destination}
                  className="w-full h-full object-cover"
                />
                {flight.badge && (
                  <div className="absolute top-4 right-4 bg-gray-600 text-white px-2 py-1 rounded text-sm">
                    {flight.badge}
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">PASSAGEM</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{flight.destination}</h3>
                <p className="text-gray-600 text-sm mb-1">{flight.origin}</p>
                <p className="text-gray-600 text-sm mb-4">{flight.airline}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Preço ida e volta</div>
                    <div className="text-2xl font-bold text-nomade-orange">{flight.price}</div>
                  </div>
                  <Button variant="outline" size="sm" className="border-nomade-orange text-nomade-orange hover:bg-nomade-orange hover:text-white">
                    Ida e Volta
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Ver mais ofertas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DomesticFlights;
