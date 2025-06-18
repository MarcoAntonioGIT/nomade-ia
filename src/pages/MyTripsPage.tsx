import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Trip = {
  id: string;
  destination: string;
  origin: string;
  budget: number;
  days: number;
  people: number;
  createdAt: string;
  status: 'generated' | 'booked' | 'completed';
};

type Package = {
  id: string;
  tripId: string;
  title: string;
  price: number;
  status: 'available' | 'purchased' | 'used';
  purchaseDate?: string;
};

const MyTripsPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    // Simulação de dados - você pode substituir por chamadas reais à API
    const mockTrips: Trip[] = [
      {
        id: '1',
        destination: 'Rio de Janeiro',
        origin: 'São Paulo',
        budget: 5000,
        days: 5,
        people: 2,
        createdAt: '2024-01-15',
        status: 'generated'
      },
      {
        id: '2',
        destination: 'Lisboa',
        origin: 'São Paulo',
        budget: 8000,
        days: 7,
        people: 1,
        createdAt: '2024-01-10',
        status: 'booked'
      }
    ];

    const mockPackages: Package[] = [
      {
        id: '1',
        tripId: '2',
        title: 'Voo São Paulo - Lisboa',
        price: 3394,
        status: 'purchased',
        purchaseDate: '2024-01-11'
      },
      {
        id: '2',
        tripId: '2',
        title: 'Hotel Centro Lisboa - 7 noites',
        price: 2100,
        status: 'purchased',
        purchaseDate: '2024-01-11'
      }
    ];

    setTrips(mockTrips);
    setPackages(mockPackages);
  }, []);

  const getStatusBadge = (status: string) => {
    const statusMap = {
      generated: { label: 'Gerado', variant: 'secondary' as const },
      booked: { label: 'Reservado', variant: 'default' as const },
      completed: { label: 'Concluído', variant: 'outline' as const },
      available: { label: 'Disponível', variant: 'secondary' as const },
      purchased: { label: 'Comprado', variant: 'default' as const },
      used: { label: 'Utilizado', variant: 'outline' as const }
    };
    
    const config = statusMap[status as keyof typeof statusMap];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">
              Minhas Viagens
            </h1>
            <p className="text-muted-foreground mb-8">
              Gerencie seus roteiros e pacotes de viagem
            </p>

            <Tabs defaultValue="trips" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="trips">Roteiros Gerados</TabsTrigger>
                <TabsTrigger value="packages">Pacotes Adquiridos</TabsTrigger>
              </TabsList>

              <TabsContent value="trips" className="space-y-4">
                {trips.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-muted-foreground mb-4">Você ainda não gerou nenhum roteiro.</p>
                      <Button className="bg-nomade-orange hover:bg-nomade-orange/90">
                        Planejar Primeira Viagem
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {trips.map((trip) => (
                      <Card key={trip.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-xl">
                            {trip.origin} → {trip.destination}
                          </CardTitle>
                          {getStatusBadge(trip.status)}
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Duração</p>
                              <p className="font-semibold">{trip.days} dias</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Pessoas</p>
                              <p className="font-semibold">{trip.people}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Orçamento</p>
                              <p className="font-semibold">R$ {trip.budget.toLocaleString('pt-BR')}</p>
                            </div>
                          </div>
                          
                          <div className="text-sm text-muted-foreground">
                            Criado em {new Date(trip.createdAt).toLocaleDateString('pt-BR')}
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              Ver Roteiro
                            </Button>
                            <Button size="sm" className="flex-1 bg-nomade-orange hover:bg-nomade-orange/90">
                              Ver Pacotes
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="packages" className="space-y-4">
                {packages.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-muted-foreground mb-4">Você ainda não adquiriu nenhum pacote.</p>
                      <Button className="bg-nomade-orange hover:bg-nomade-orange/90">
                        Explorar Pacotes
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {packages.map((pkg) => {
                      const relatedTrip = trips.find(t => t.id === pkg.tripId);
                      return (
                        <Card key={pkg.id}>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <h3 className="text-lg font-semibold">{pkg.title}</h3>
                                {relatedTrip && (
                                  <p className="text-sm text-muted-foreground">
                                    Viagem: {relatedTrip.origin} → {relatedTrip.destination}
                                  </p>
                                )}
                                {pkg.purchaseDate && (
                                  <p className="text-sm text-muted-foreground">
                                    Comprado em {new Date(pkg.purchaseDate).toLocaleDateString('pt-BR')}
                                  </p>
                                )}
                              </div>
                              
                              <div className="text-right space-y-2">
                                <div className="text-xl font-bold text-nomade-orange">
                                  R$ {pkg.price.toLocaleString('pt-BR')}
                                </div>
                                {getStatusBadge(pkg.status)}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyTripsPage;
