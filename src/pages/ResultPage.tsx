
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ResultPage = () => {
  const [webhookResponse, setWebhookResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedResponse = localStorage.getItem('webhookResponse');
    
    if (!storedResponse) {
      toast({
        title: "Nenhum resultado encontrado",
        description: "Redirecionando para o planejador de viagem.",
        variant: "destructive",
      });
      navigate('/planner');
      return;
    }

    try {
      // Se a resposta for um JSON, extrair o texto; caso contrário, usar a resposta diretamente
      let responseText = storedResponse;
      try {
        const parsedResponse = JSON.parse(storedResponse);
        responseText = typeof parsedResponse === 'string' ? parsedResponse : JSON.stringify(parsedResponse, null, 2);
      } catch {
        // Se não for JSON válido, usar a string diretamente
        responseText = storedResponse;
      }
      
      setWebhookResponse(responseText);
    } catch (error) {
      console.error('Erro ao processar resposta do webhook:', error);
      setWebhookResponse('Erro ao processar a resposta do webhook.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate, toast]);

  const handleNewTrip = () => {
    localStorage.removeItem('tripFormData');
    localStorage.removeItem('webhookResponse');
    navigate('/planner');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-travel-orange"></div>
            <p className="text-muted-foreground">Carregando resultado...</p>
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Seu Roteiro de Viagem
            </h1>
            <p className="text-muted-foreground mb-8">
              Aqui está o roteiro personalizado criado pela nossa IA:
            </p>
            
            <div className="space-y-4">
              <div className="bg-white border rounded-lg p-6">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                  {webhookResponse}
                </pre>
              </div>
              
              <div className="flex justify-between">
                <Button
                  onClick={handleNewTrip}
                  variant="outline"
                >
                  Planejar Nova Viagem
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResultPage;
