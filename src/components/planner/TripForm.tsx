
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import TripFormFields, { TripFormData } from '@/components/forms/TripFormFields';
import LoadingSpinner from '@/components/ui/loading-spinner';

const TripForm = () => {
  const [formData, setFormData] = useState<TripFormData>({
    origin: '',
    destination: '',
    budget: 5000,
    days: 5,
    people: 2,
    preferences: [],
    dietaryRestrictions: [],
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, session } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }));
  };

  const handleCheckboxChange = (category: 'preferences' | 'dietaryRestrictions', value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [category]: checked
        ? [...prev[category], value]
        : prev[category].filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.origin || !formData.destination) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha a origem e o destino da sua viagem.",
        variant: "destructive",
      });
      return;
    }

    if (!user || !session) {
      toast({
        title: "Autenticação necessária",
        description: "Você precisa estar logado para gerar um roteiro.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    console.log("Enviando dados do formulário para webhook:", formData);
    console.log("Session token:", session.access_token);

    try {
      const response = await fetch('https://n8n.nomadeia.com.br/webhook-test/gerar-roteiro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          ...formData,
          userId: user.id,
          userEmail: user.email,
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (response.ok) {
        const responseText = await response.text();
        console.log("Resposta do webhook (texto):", responseText);
        
        // Store form data and response
        localStorage.setItem('tripFormData', JSON.stringify(formData));
        localStorage.setItem('webhookResponse', responseText);
        
        toast({
          title: "Roteiro gerado com sucesso!",
          description: "Redirecionando para o resultado.",
        });
        
        navigate('/result');
      } else {
        const errorText = await response.text();
        console.error("Erro na resposta:", response.status, errorText);
        
        let errorMessage = "Ocorreu um erro ao processar sua solicitação.";
        
        if (response.status === 401) {
          errorMessage = "Erro de autenticação. Tente fazer login novamente.";
        } else if (response.status === 400) {
          errorMessage = "Dados inválidos enviados. Verifique os campos preenchidos.";
        } else if (response.status === 500) {
          errorMessage = "Erro interno do servidor. Tente novamente em alguns minutos.";
        } else if (response.status === 404) {
          errorMessage = "Serviço não encontrado. Verifique a configuração.";
        }

        toast({
          title: "Erro ao gerar roteiro",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro de rede ao enviar dados para webhook:", error);
      
      let errorMessage = "Erro de conexão. Verifique sua internet e tente novamente.";
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = "Não foi possível conectar ao servidor. Tente novamente.";
      }

      toast({
        title: "Erro de conexão",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

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
        onInputChange={handleInputChange}
        onSliderChange={handleSliderChange}
        onCheckboxChange={handleCheckboxChange}
      />

      <Button 
        type="submit" 
        className="w-full md:w-auto bg-nomade-orange hover:bg-nomade-orange/90 text-white"
        disabled={isGenerating}
      >
        {isGenerating ? 'Processando...' : 'Planejar Viagem'}
      </Button>
    </form>
  );
};

export default TripForm;
