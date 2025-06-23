import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import TripFormFields from '@/components/forms/TripFormFields';
import { TripFormData } from '@/types';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { apiService } from '@/services/api';
import TravelPackages from '@/components/packages/TravelPackages';

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

  // Dados de exemplo para ofertas (pode ser substituído por props ou API futuramente)
  const ofertasPacotes = [];

  if (isGenerating) {
    return (
      <LoadingSpinner 
        title="Gerando Roteiro"
        description="Nossa IA está criando o roteiro perfeito para você..."
      />
    );
  }

  return (
    <>
      {/* Banner principal */}
      <section className="relative h-[480px] flex items-center bg-cover bg-center" style={{ backgroundImage: "url('/public/banner-van.jpg'), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')" }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container flex flex-col justify-center h-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
              Monte sua viagem personalizada com <br /> inteligência artificial
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 drop-shadow">
              Combinamos tecnologia avançada com conhecimento profundo de turismo para criar o roteiro perfeito para você.
            </p>
            <Button 
              size="lg" 
              className="bg-nomade-orange hover:bg-nomade-orange/90 text-white px-8 text-lg font-semibold shadow-lg"
              onClick={() => {
                const el = document.getElementById('trip-form-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Planeje sua viagem
            </Button>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold font-heading text-center mb-12">Como funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <div className="text-4xl font-bold text-nomade-orange mb-2">1</div>
              <h3 className="font-semibold text-xl mb-2">Preencha suas preferências</h3>
              <p className="text-muted-foreground">Informe seu destino, datas, orçamento e preferências para que nossa IA entenda o que você busca.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <div className="text-4xl font-bold text-nomade-orange mb-2">2</div>
              <h3 className="font-semibold text-xl mb-2">Receba seu roteiro personalizado</h3>
              <p className="text-muted-foreground">Nossa IA cria um roteiro detalhado com atrações, restaurantes e dicas locais adaptadas ao seu perfil.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <div className="text-4xl font-bold text-nomade-orange mb-2">3</div>
              <h3 className="font-semibold text-xl mb-2">Viaje com tranquilidade</h3>
              <p className="text-muted-foreground">Reserve tudo em um só lugar e aproveite sua viagem com acesso ao seu itinerário pelo aplicativo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário de planejamento */}
      <section id="trip-form-section" className="py-16 bg-white">
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

      {/* Ofertas de passagens aéreas */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold font-heading mb-2">PASSAGENS AÉREAS</h2>
          <p className="text-lg text-muted-foreground mb-8">Promoções encontradas nas últimas 12h!</p>
          <TravelPackages packages={ofertasPacotes} onSelectPackage={() => {}} />
        </div>
      </section>
    </>
  );
};

export default TripPlannerSection;
