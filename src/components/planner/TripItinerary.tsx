import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TripFormData } from '@/types';

type ItineraryDay = {
  day: number;
  activities: {
    time: string;
    description: string;
    type: 'attraction' | 'food' | 'transportation' | 'accommodation';
  }[];
};

type Accommodation = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

type Flight = {
  departure: string;
  arrival: string;
  airline: string;
  duration: string;
  price: number;
};

type Weather = {
  date: string;
  condition: string;
  temperature: number;
};

type Itinerary = {
  summary: string;
  days: ItineraryDay[];
  accommodation: Accommodation;
  flights: {
    outbound: Flight;
    inbound: Flight;
  };
  weather: Weather[];
  totalCost: number;
};

const TripItinerary = () => {
  const [tripData, setTripData] = useState<TripFormData | null>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const calculateDuration = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  useEffect(() => {
    const storedData = localStorage.getItem('tripFormData');
    if (!storedData) {
      navigate('/planner');
      return;
    }
    
    setTripData(JSON.parse(storedData));
    
    // Simular carregamento de dados da API
    setTimeout(() => {
      // Dados fictícios de roteiro para demonstração
      const mockItinerary: Itinerary = generateMockItinerary(JSON.parse(storedData));
      setItinerary(mockItinerary);
      setLoading(false);
    }, 1500);
  }, [navigate]);

  const generateMockItinerary = (data: TripFormData): Itinerary => {
    const duration = data.departureDate && data.returnDate 
      ? calculateDuration(data.departureDate, data.returnDate)
      : 5; // fallback para 5 dias

    const days = Array.from({ length: duration }, (_, i) => ({
      day: i + 1,
      activities: [
        {
          time: '09:00',
          description: `Visita ao ponto turístico principal de ${data.destination}`,
          type: 'attraction' as const,
        },
        {
          time: '12:30',
          description: 'Almoço em restaurante local com pratos típicos',
          type: 'food' as const,
        },
        {
          time: '15:00',
          description: 'Tour guiado pelo centro histórico',
          type: 'attraction' as const,
        },
        {
          time: '19:00',
          description: 'Jantar em restaurante recomendado',
          type: 'food' as const,
        },
      ],
    }));

    return {
      summary: `Um roteiro personalizado de ${duration} dias em ${data.destination} para ${data.people} ${data.people === 1 ? 'pessoa' : 'pessoas'}, com foco em ${data.preferences.join(', ') || 'turismo geral'}.`,
      days,
      accommodation: {
        name: `Hotel Central ${data.destination}`,
        description: 'Hotel 4 estrelas com excelente localização, café da manhã incluso, Wi-Fi grátis e piscina.',
        price: Math.round(data.budget * 0.4 / duration),
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      },
      flights: {
        outbound: {
          departure: '08:25',
          arrival: '10:15',
          airline: 'LATAM Airlines',
          duration: '1h 50min',
          price: Math.round(data.budget * 0.3),
        },
        inbound: {
          departure: '18:40',
          arrival: '20:30',
          airline: 'LATAM Airlines',
          duration: '1h 50min',
          price: Math.round(data.budget * 0.3),
        },
      },
      weather: Array.from({ length: duration }, (_, i) => ({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
        condition: ['Ensolarado', 'Parcialmente nublado', 'Nublado'][Math.floor(Math.random() * 3)],
        temperature: Math.floor(Math.random() * 10) + 25,
      })),
      totalCost: Math.round(data.budget * 0.9),
    };
  };

  const handleGoBack = () => {
    navigate('/summary');
  };

  const handleShare = () => {
    alert('Função de compartilhamento será implementada em breve!');
  };

  const handleDownload = () => {
    alert('Função de download será implementada em breve!');
  };

  if (loading || !itinerary) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-pulse h-6 w-40 bg-muted rounded-md"></div>
        <div className="animate-pulse h-24 w-full max-w-md bg-muted rounded-md"></div>
        <div className="animate-pulse h-48 w-full max-w-md bg-muted rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 fade-in">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold font-heading text-travel-blue">
          Seu roteiro personalizado
        </h2>
        <p className="text-muted-foreground text-lg">{itinerary.summary}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Roteiro dia a dia</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={`day-1`} className="w-full">
                <TabsList className="mb-4 flex flex-nowrap overflow-x-auto max-w-full">
                  {itinerary.days.map((day) => (
                    <TabsTrigger key={day.day} value={`day-${day.day}`}>
                      Dia {day.day}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {itinerary.days.map((day) => (
                  <TabsContent key={day.day} value={`day-${day.day}`} className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">
                        Dia {day.day} - {itinerary.weather[day.day - 1]?.date}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{itinerary.weather[day.day - 1]?.condition}</span>
                        <span className="ml-2">{itinerary.weather[day.day - 1]?.temperature}°C</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {day.activities.map((activity, index) => (
                        <div 
                          key={index}
                          className={`p-4 rounded-md flex ${
                            activity.type === 'attraction' 
                              ? 'bg-travel-light-blue' 
                              : activity.type === 'food'
                              ? 'bg-travel-light-orange'
                              : 'bg-travel-light-green'
                          }`}
                        >
                          <div className="min-w-[70px] font-semibold">{activity.time}</div>
                          <div>{activity.description}</div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hospedagem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video rounded-md overflow-hidden">
                <img 
                  src={itinerary.accommodation.imageUrl} 
                  alt={itinerary.accommodation.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{itinerary.accommodation.name}</h3>
              <p className="text-sm text-muted-foreground">{itinerary.accommodation.description}</p>
              <p className="text-travel-blue font-semibold">
                R$ {itinerary.accommodation.price.toLocaleString('pt-BR')} / noite
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Voos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="text-sm font-semibold">Ida</h4>
                  <div className="flex justify-between mt-2">
                    <div>
                      <p className="text-lg font-semibold">{itinerary.flights.outbound.departure}</p>
                      <p className="text-xs text-muted-foreground">{tripData?.origin}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">{itinerary.flights.outbound.duration}</p>
                      <div className="w-16 h-0.5 bg-travel-blue mx-auto my-1"></div>
                      <p className="text-xs text-muted-foreground">{itinerary.flights.outbound.airline}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">{itinerary.flights.outbound.arrival}</p>
                      <p className="text-xs text-muted-foreground">{tripData?.destination}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold">Volta</h4>
                  <div className="flex justify-between mt-2">
                    <div>
                      <p className="text-lg font-semibold">{itinerary.flights.inbound.departure}</p>
                      <p className="text-xs text-muted-foreground">{tripData?.destination}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">{itinerary.flights.inbound.duration}</p>
                      <div className="w-16 h-0.5 bg-travel-blue mx-auto my-1"></div>
                      <p className="text-xs text-muted-foreground">{itinerary.flights.inbound.airline}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">{itinerary.flights.inbound.arrival}</p>
                      <p className="text-xs text-muted-foreground">{tripData?.origin}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between">
                    <p className="font-semibold">Total voos:</p>
                    <p className="font-semibold text-travel-blue">
                      R$ {(itinerary.flights.outbound.price + itinerary.flights.inbound.price).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custo estimado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">
                    Hospedagem ({tripData?.departureDate && tripData?.returnDate 
                      ? `${calculateDuration(tripData.departureDate, tripData.returnDate)} noites`
                      : 'noites não definidas'
                    })
                  </p>
                  <p>R$ {(itinerary.accommodation.price * (tripData?.departureDate && tripData?.returnDate 
                    ? calculateDuration(tripData.departureDate, tripData.returnDate)
                    : 0
                  )).toLocaleString('pt-BR')}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Voos</p>
                  <p>R$ {(itinerary.flights.outbound.price + itinerary.flights.inbound.price).toLocaleString('pt-BR')}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Atividades e alimentação</p>
                  <p>R$ {Math.round(itinerary.totalCost * 0.3).toLocaleString('pt-BR')}</p>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                  <p>Total</p>
                  <p className="text-travel-blue">R$ {itinerary.totalCost.toLocaleString('pt-BR')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Button variant="outline" onClick={handleGoBack}>
          Voltar ao resumo
        </Button>
        <Button variant="outline" onClick={handleShare}>
          Compartilhar
        </Button>
        <Button onClick={handleDownload} className="bg-travel-blue hover:bg-travel-blue/90">
          Baixar roteiro (PDF)
        </Button>
        <Button className="bg-travel-orange hover:bg-travel-orange/90 md:ml-auto">
          Reservar essa viagem
        </Button>
      </div>
    </div>
  );
};

export default TripItinerary;
