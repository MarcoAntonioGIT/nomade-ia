import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import TripFormFields from '@/components/forms/TripFormFields';
import { TripFormData } from '@/types';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { apiService } from '@/services/api';

interface TripPlannerSectionProps {
  onTripGenerated: (data: TripFormData, packages: any[]) => void;
  onAuthRequired: () => void;
}

const TripPlannerSection = ({ onTripGenerated, onAuthRequired }: TripPlannerSectionProps) => {
  const [formData, setFormData] = useState<TripFormData>({
    origin: '',
    destination: '',
    budget: 5000,
    budgetText: 'R$ 5.000',
    people: 2,
    preferences: [],
    dietaryRestrictions: [],
    departureDate: '',
    returnDate: '',
    additionalInfo: '',
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, session } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleDateChange = (field: 'departureDate' | 'returnDate', date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date ? date.toISOString().split('T')[0] : '',
    }));
  };

  const handleBudgetChange = (budgetText: string) => {
    const numbers = budgetText.replace(/\D/g, '');
    const budgetValue = numbers ? parseInt(numbers, 10) : 0;
    
    setFormData((prev) => ({
      ...prev,
      budgetText,
      budget: budgetValue,
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

    if (!formData.departureDate || !formData.returnDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, selecione as datas de ida e volta.",
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
    console.log("Enviando dados do formulário:", formData);

    try {
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
              onDateChange={handleDateChange}
              onBudgetChange={handleBudgetChange}
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
