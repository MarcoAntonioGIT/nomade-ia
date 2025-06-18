
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type TravelPackage = {
  id: string;
  title: string;
  description: string;
  origin: string;
  destination: string;
  type: string;
  price: number;
  originalPrice?: number;
  image: string;
  duration: string;
  airline?: string;
  isPromotion?: boolean;
};

interface TravelPackagesProps {
  packages: TravelPackage[];
  onSelectPackage: (packageId: string) => void;
}

const TravelPackages = ({ packages, onSelectPackage }: TravelPackagesProps) => {
  // Dados de exemplo caso não venham pacotes do webhook
  const defaultPackages: TravelPackage[] = [
    {
      id: '1',
      title: 'Voo para Santiago',
      description: 'Saindo de São Paulo',
      origin: 'São Paulo',
      destination: 'Santiago',
      type: 'Ida e Volta',
      price: 1043,
      image: 'https://images.unsplash.com/photo-1544737151406-6e4c999de2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      duration: 'Ida e Volta',
      isPromotion: true
    },
    {
      id: '2',
      title: 'Madrid + Lisboa',
      description: 'Saindo de São Paulo',
      origin: 'São Paulo',
      destination: 'Madrid + Lisboa',
      type: 'Ida e Volta',
      price: 3572,
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      duration: 'Ida e Volta',
      isPromotion: true
    },
    {
      id: '3',
      title: 'Voo para Lisboa',
      description: 'Saindo de São Paulo',
      origin: 'São Paulo',
      destination: 'Lisboa',
      type: 'Ida e Volta',
      price: 3394,
      image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      duration: 'Ida e Volta',
      isPromotion: true
    },
    {
      id: '4',
      title: 'Londres + Lisboa',
      description: 'Saindo de São Paulo',
      origin: 'São Paulo',
      destination: 'Londres + Lisboa',
      type: 'Ida e Volta',
      price: 3514,
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      duration: 'Ida e Volta',
      isPromotion: true
    }
  ];

  const displayPackages = packages.length > 0 ? packages : defaultPackages;

  return (
    <section className="py-16 bg-muted">
      <div className="container">
        <div className="mb-8">
          <h2 className="text-3xl font-bold font-heading mb-2">
            Pacotes Personalizados
          </h2>
          <p className="text-lg text-muted-foreground">
            Baseado no seu roteiro, encontramos essas ofertas especiais para você
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPackages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                {pkg.isPromotion && (
                  <Badge className="absolute top-3 left-3 bg-purple-600 hover:bg-purple-700">
                    Oferta Imbatível
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-lg mb-1">{pkg.title}</h3>
                  <p className="text-sm text-blue-600 font-medium">{pkg.description}</p>
                  <p className="text-sm text-muted-foreground">{pkg.duration}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-muted-foreground">R$</span>
                    <span className="text-2xl font-bold">
                      {pkg.price.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  {pkg.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      R$ {pkg.originalPrice.toLocaleString('pt-BR')}
                    </span>
                  )}
                </div>

                <Button 
                  onClick={() => onSelectPackage(pkg.id)}
                  className="w-full bg-nomade-orange hover:bg-nomade-orange/90"
                >
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Ver Todos os Pacotes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TravelPackages;
