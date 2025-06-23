import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { apiService } from '@/services/api';
import { supabase } from '@/integrations/supabase/client';

type Trip = {
  id: string;
  destination: string;
  origin: string;
  trip_title: string;
  departure_date: string;
  return_date: string;
  created_at: string;
  status: string;
};

type Package = {
  id: string;
  package_id: string;
  title: string;
  price: number;
  status: string;
  purchase_date: string;
};

const MyTripsPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Fetch user's itineraries using ApiService
      const tripsResponse = await apiService.getUserTrips();
      if (tripsResponse.success && tripsResponse.data) {
        setTrips(tripsResponse.data);
      } else {
        throw new Error(tripsResponse.error || 'Failed to fetch trips');
      }

      // Fetch user's packages
      const { data: packagesData, error: packagesError } = await supabase
        .from('user_packages')
        .select(`
          *,
          packages (
            title,
            price,
            description
          )
        `)
        .eq('user_id', user?.id)
        .order('purchase_date', { ascending: false });

      if (packagesError) {
        console.error('Error fetching packages:', packagesError);
        toast.error("Erro ao carregar pacotes", {
          description: "Não foi possível carregar seus pacotes. Tente novamente.",
        });
      } else {
        console.log('Fetched packages:', packagesData);
        const formattedPackages = packagesData?.map(pkg => ({
          id: pkg.id,
          package_id: pkg.package_id,
          title: pkg.packages?.title || 'Pacote sem título',
          price: pkg.price_paid || pkg.packages?.price || 0,
          status: pkg.status,
          purchase_date: pkg.purchase_date
        })) || [];
        setPackages(formattedPackages);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error("Erro ao carregar dados", {
        description: "Não foi possível carregar seus dados. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const getStatusBadge = (status: string) => {
    const statusMap = {
      generating: { label: 'Gerando', variant: 'secondary' as const },
      generated: { label: 'Gerado', variant: 'default' as const },
      booked: { label: 'Reservado', variant: 'default' as const },
      completed: { label: 'Concluído', variant: 'outline' as const },
      reserved: { label: 'Reservado', variant: 'secondary' as const },
      purchased: { label: 'Comprado', variant: 'default' as const },
      used: { label: 'Utilizado', variant: 'outline' as const }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || { label: status, variant: 'secondary' as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const calculateDays = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 'N/A';
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-nomade-orange mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Carregando suas viagens...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                      <Button 
                        className="bg-nomade-orange hover:bg-nomade-orange/90"
                        onClick={() => navigate('/#planner')}
                      >
                        Planejar Primeira Viagem
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {trips.map((trip) => (
                      <Card key={trip.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/itinerary/${trip.id}`)}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-xl">
                            {trip.trip_title || `${trip.origin} → ${trip.destination}`}
                          </CardTitle>
                          {getStatusBadge(trip.status)}
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Duração</p>
                              <p className="font-medium">{calculateDays(trip.departure_date, trip.return_date)} dias</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Data</p>
                              <p className="font-medium">{new Date(trip.departure_date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full">
                            Ver Detalhes
                          </Button>
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
                      <Button 
                        className="bg-nomade-orange hover:bg-nomade-orange/90"
                        onClick={() => navigate('/offers')}
                      >
                        Explorar Pacotes
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {packages.map((pkg) => (
                      <Card key={pkg.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h3 className="text-lg font-semibold">{pkg.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                Comprado em {new Date(pkg.purchase_date).toLocaleDateString('pt-BR')}
                              </p>
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
                    ))}
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

