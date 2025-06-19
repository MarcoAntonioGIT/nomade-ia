
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import TripFormFields, { TripFormData } from '@/components/forms/TripFormFields';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface TripPlannerSectionProps {
  onTripGenerated: (data: TripFormData, packages: any[]) => void;
  onAuthRequired: () => void;
}

const TripPlannerSection = ({ onTripGenerated, onAuthRequired }: TripPlannerSectionProps) => {
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
        title: "Login necessário",
        description: "Faça login para gerar um roteiro personalizado.",
      });
      onAuthRequired();
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
        } else if (response.status === 500) {
          errorMessage = "Erro interno do servidor. Tente novamente em alguns minutos.";
        }

        toast({
          title: "Erro ao gerar roteiro",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro de rede ao enviar dados para webhook:", error);
      
      toast({
        title: "Erro de conexão",
        description: "Erro de conexão. Verifique sua internet e tente novamente.",
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
    <section className="py-16 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-center mb-4">
            Planeje sua viagem
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Preencha suas preferências e nossa IA criará um roteiro personalizado com opções de pacotes exclusivas.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <TripFormFields
              formData={formData}
              onInputChange={handleInputChange}
              onSliderChange={handleSliderChange}
              onCheckboxChange={handleCheckboxChange}
            />

            <div className="text-center">
              <Button 
                type="submit" 
                size="lg"
                className="bg-nomade-orange hover:bg-nomade-orange/90 text-white px-8"
                disabled={isGenerating}
              >
                {isGenerating ? 'Processando...' : 'Planejar Viagem'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TripPlannerSection;
