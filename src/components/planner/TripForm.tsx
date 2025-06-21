import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useTripForm } from '@/hooks/useTripForm';
import { apiService } from '@/services/api';
import TripFormFields from '@/components/forms/TripFormFields';
import LoadingSpinner from '@/components/ui/loading-spinner';

const TripForm: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, session } = useAuth();
  const { 
    formData, 
    updateInputField, 
    updateSliderField, 
    updateCheckboxField,
    updateDateField,
    updateBudgetField,
    swapOriginDestination,
    validateForm 
  } = useTripForm();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateForm();
    if (!validation.isValid) {
      toast({
        title: "Campos obrigatórios",
        description: validation.errors.join(', '),
        variant: "destructive",
      });
      return;
    }

    // Check authentication
    if (!user || !session) {
      toast({
        title: "Autenticação necessária",
        description: "Você precisa estar logado para gerar um roteiro.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      console.log("Enviando dados do formulário:", formData);
      
      const response = await apiService.generateTrip(formData);
      
      if (response.success && response.data) {
        // Save to storage
        apiService.saveTripToStorage(formData, JSON.stringify(response.data));
        
        toast({
          title: "Roteiro gerado com sucesso!",
          description: "Redirecionando para o resultado.",
        });
        
        navigate('/result');
      } else {
        throw new Error(response.error || 'Erro desconhecido');
      }
    } catch (error) {
      console.error("Erro ao gerar roteiro:", error);
      
      let errorMessage = "Ocorreu um erro ao processar sua solicitação.";
      
      if (error instanceof Error) {
        if (error.message.includes('AUTH_REQUIRED')) {
          errorMessage = "Erro de autenticação. Tente fazer login novamente.";
        } else if (error.message.includes('NETWORK_ERROR')) {
          errorMessage = "Erro de conexão. Verifique sua internet e tente novamente.";
        } else if (error.message.includes('TIMEOUT')) {
          errorMessage = "Tempo limite excedido. Tente novamente.";
        } else {
          errorMessage = error.message;
        }
      }

      toast({
        title: "Erro ao gerar roteiro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }, [formData, user, session, toast, navigate, validateForm]);

  const handleTestConnectivity = useCallback(async () => {
    try {
      // First test general internet connectivity
      const internetOk = await apiService.testInternetConnectivity();
      
      if (!internetOk) {
        toast({
          title: "Problema de Internet",
          description: "Não foi possível conectar à internet. Verifique sua conexão.",
          variant: "destructive",
        });
        return;
      }

      // Then test webhook connectivity
      const webhookOk = await apiService.testWebhookConnectivity();
      
      if (webhookOk) {
        toast({
          title: "Conectividade OK",
          description: "Webhook está acessível e funcionando.",
        });
      } else {
        toast({
          title: "Problema no Webhook",
          description: "Internet OK, mas webhook não está acessível. Verifique a URL.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro no Teste",
        description: "Erro ao testar conectividade.",
        variant: "destructive",
      });
    }
  }, [toast]);

  if (isGenerating) {
    return (
      <LoadingSpinner 
        title="Gerando Roteiro"
        description="Nossa IA está criando o roteiro perfeito para você..."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TripFormFields
        formData={formData}
        onInputChange={updateInputField}
        onSliderChange={updateSliderField}
        onCheckboxChange={updateCheckboxField}
        onDateChange={updateDateField}
        onBudgetChange={updateBudgetField}
        onSwapOriginDestination={swapOriginDestination}
      />

      <Button 
        type="submit" 
        className="w-full md:w-auto bg-nomade-orange hover:bg-nomade-orange/90 text-white px-8 py-3"
        disabled={isGenerating}
        size="lg"
      >
        {isGenerating ? 'Processando...' : 'Planejar Viagem'}
      </Button>

      <Button 
        type="button" 
        onClick={handleTestConnectivity}
        className="w-full md:w-auto bg-gray-500 hover:bg-gray-600 text-white px-8 py-3"
        size="lg"
        variant="outline"
      >
        Testar Conectividade
      </Button>
    </form>
  );
};

export default TripForm;
