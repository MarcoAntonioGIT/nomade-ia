
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy, Download, Share2 } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';

const ResultPage = () => {
  const [webhookResponse, setWebhookResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResponse = localStorage.getItem('webhookResponse');
    
    if (!storedResponse) {
      toast.error("Nenhum resultado encontrado");
      navigate('/planner');
      return;
    }

    let responseText = storedResponse;
    try {
      const parsedResponse = JSON.parse(storedResponse);
      if (typeof parsedResponse === 'object' && parsedResponse !== null) {
        responseText = parsedResponse.content || parsedResponse.message || parsedResponse.result || JSON.stringify(parsedResponse, null, 2);
      } else if (typeof parsedResponse === 'string') {
        responseText = parsedResponse;
      }
    } catch {
      responseText = storedResponse;
    }
    
    setWebhookResponse(responseText);
    setIsLoading(false);
  }, [navigate]);

  const handleNewTrip = () => {
    localStorage.removeItem('tripFormData');
    localStorage.removeItem('webhookResponse');
    navigate('/planner');
  };

  const handleCopyItinerary = async () => {
    try {
      await navigator.clipboard.writeText(webhookResponse);
      toast.success("Roteiro copiado!");
    } catch (error) {
      toast.error("Erro ao copiar");
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
    toast.info("Download iniciado");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meu Roteiro de Viagem',
          text: webhookResponse,
        });
      } catch (error) {
        handleCopyItinerary();
      }
    } else {
      handleCopyItinerary();
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner title="Carregando resultado..." />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-6">
            Seu Roteiro de Viagem
          </h1>
          <p className="text-muted-foreground mb-8">
            Aqui está o roteiro personalizado criado pela nossa IA:
          </p>
          
          <div className="space-y-4">
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
                {webhookResponse}
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
    </PageLayout>
  );
};

export default ResultPage;
