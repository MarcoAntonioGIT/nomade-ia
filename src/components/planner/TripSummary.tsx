
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TripFormData } from './TripForm';
import { useToast } from '@/hooks/use-toast';

const TripSummary = () => {
  const [tripData, setTripData] = useState<TripFormData | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedData = localStorage.getItem('tripFormData');
    if (storedData) {
      setTripData(JSON.parse(storedData));
    } else {
      navigate('/planner');
    }
  }, [navigate]);

  const handleGoBack = () => {
    navigate('/planner');
  };

  const handleGenerateItinerary = () => {
    // Simular tempo de processamento da IA
    toast({
      title: "Gerando roteiro",
      description: "Nossa IA está personalizando o melhor roteiro para você.",
    });
    
    setTimeout(() => {
      navigate('/itinerary');
    }, 2000);
  };

  if (!tripData) {
    return <div className="flex justify-center items-center min-h-[400px]">Carregando...</div>;
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Resumo da viagem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-muted-foreground">De</h3>
              <p className="text-lg font-semibold">{tripData.origin}</p>
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground">Para</h3>
              <p className="text-lg font-semibold">{tripData.destination}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted rounded-md p-4">
              <h3 className="text-sm text-muted-foreground">Orçamento</h3>
              <p className="text-lg font-semibold">R$ {tripData.budget.toLocaleString('pt-BR')}</p>
            </div>
            <div className="bg-muted rounded-md p-4">
              <h3 className="text-sm text-muted-foreground">Duração</h3>
              <p className="text-lg font-semibold">{tripData.days} {tripData.days === 1 ? 'dia' : 'dias'}</p>
            </div>
            <div className="bg-muted rounded-md p-4">
              <h3 className="text-sm text-muted-foreground">Viajantes</h3>
              <p className="text-lg font-semibold">{tripData.people} {tripData.people === 1 ? 'pessoa' : 'pessoas'}</p>
            </div>
          </div>

          {tripData.preferences.length > 0 && (
            <div>
              <h3 className="text-sm text-muted-foreground mb-2">Preferências selecionadas</h3>
              <div className="flex flex-wrap gap-2">
                {tripData.preferences.map((pref) => (
                  <span key={pref} className="bg-travel-light-blue text-travel-blue px-3 py-1 rounded-full text-sm">
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          )}

          {tripData.dietaryRestrictions.length > 0 && (
            <div>
              <h3 className="text-sm text-muted-foreground mb-2">Restrições alimentares</h3>
              <div className="flex flex-wrap gap-2">
                {tripData.dietaryRestrictions.map((diet) => (
                  <span key={diet} className="bg-travel-light-green text-travel-green px-3 py-1 rounded-full text-sm">
                    {diet}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4">
        <Button variant="outline" onClick={handleGoBack}>
          Voltar e editar
        </Button>
        <Button onClick={handleGenerateItinerary} className="bg-travel-blue hover:bg-travel-blue/90">
          Gerar roteiro personalizado
        </Button>
      </div>
    </div>
  );
};

export default TripSummary;
