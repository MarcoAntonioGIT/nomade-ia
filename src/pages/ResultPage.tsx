
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download, Share2 } from 'lucide-react';

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

    // Process the response - handle both plain text and JSON
    let responseText = storedResponse;
    try {
      const parsedResponse = JSON.parse(storedResponse);
      // If it's a JSON object, extract meaningful content
      if (typeof parsedResponse === 'object' && parsedResponse !== null) {
        responseText = parsedResponse.content || parsedResponse.message || parsedResponse.result || JSON.stringify(parsedResponse, null, 2);
      } else if (typeof parsedResponse === 'string') {
        responseText = parsedResponse;
      }
    } catch {
      // If JSON parsing fails, use the original text
      responseText = storedResponse;
    }
    
    setWebhookResponse(responseText);
    setIsLoading(false);
  }, [navigate, toast]);

  const handleNewTrip = () => {
    localStorage.removeItem('tripFormData');
    localStorage.removeItem('webhookResponse');
    navigate('/planner');
  };

  const handleCopyItinerary = async () => {
    try {
      await navigator.clipboard.writeText(webhookResponse);
      toast({
        title: "Roteiro copiado!",
        description: "O roteiro foi copiado para a área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o roteiro.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([webhookResponse], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'roteiro-viagem.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download iniciado",
      description: "O roteiro está sendo baixado.",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meu Roteiro de Viagem',
          text: webhookResponse,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copy
      handleCopyItinerary();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nomade-orange"></div>
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
              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
                    {webhookResponse}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-between">
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleCopyItinerary}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copiar
                  </Button>
                  
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Baixar
                  </Button>
                  
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Compartilhar
                  </Button>
                </div>
                
                <Button
                  onClick={handleNewTrip}
                  className="bg-nomade-orange hover:bg-nomade-orange/90"
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
