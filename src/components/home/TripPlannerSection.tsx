import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
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
    departureDate: '',
    returnDate: '',
    additionalInfo: '',
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { user, session } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }));
  };

  const handleCheckboxChange = (category: 'preferences', value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [category]: checked
        ? [...prev[category], value]
        : prev[category].filter((item) => item !== value),
    }));
  };

  const handleDateChange = (field: 'departureDate' | 'returnDate', date: Date | undefined) => {
    if (date) {
      // Manually format the date to YYYY-MM-DD string to avoid any timezone conversion.
      // This is the most robust way to handle dates from a date picker.
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      setFormData((prev) => ({
        ...prev,
        [field]: formattedDate,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
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

  const handleSwapOriginDestination = () => {
    setFormData((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.origin || !formData.destination) {
      toast.error("Campos obrigatórios", {
        description: "Por favor, preencha a origem e o destino da sua viagem.",
      });
      return;
    }

    if (!formData.departureDate) {
      toast.error("Campos obrigatórios", {
        description: "Por favor, selecione a data de ida.",
      });
      return;
    }

    if (!user || !session) {
      toast.error("Login necessário", {
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
        // Save to storage temporarily for immediate redirection
        apiService.saveTripToStorage(formData, JSON.stringify(response.data));
        
        toast.success("Roteiro gerado com sucesso!", {
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

      toast.error("Erro ao gerar roteiro", {
        description: errorMessage,
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
              onSwapOriginDestination={handleSwapOriginDestination}
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
