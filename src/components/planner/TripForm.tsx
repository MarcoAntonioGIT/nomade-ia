import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

export type TripFormData = {
  origin: string;
  destination: string;
  budget: number;
  days: number;
  people: number;
  preferences: string[];
  dietaryRestrictions: string[];
};

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
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

    setIsGenerating(true);
    console.log("Enviando dados do formulário para webhook:", formData);

    try {
      const response = await fetch('https://n8n.tomatize.com/webhook-test/smarttravelai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Resposta do webhook:", responseData);
        
        // Salvar os dados no localStorage para uso nas próximas páginas
        localStorage.setItem('tripFormData', JSON.stringify(formData));
        localStorage.setItem('webhookResponse', JSON.stringify(responseData));
        
        toast({
          title: "Roteiro gerado com sucesso!",
          description: "Redirecionando para o resumo da viagem.",
        });
        
        navigate('/summary');
      } else {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
    } catch (error) {
      console.error("Erro ao enviar dados para webhook:", error);
      toast({
        title: "Erro ao gerar roteiro",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-travel-orange"></div>
        <h2 className="text-2xl font-semibold text-center">Gerando Roteiro</h2>
        <p className="text-muted-foreground text-center">Nossa IA está criando o roteiro perfeito para você...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="origin">Cidade de origem *</Label>
          <Input
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={handleInputChange}
            placeholder="Ex: São Paulo"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination">Destino *</Label>
          <Input
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            placeholder="Ex: Rio de Janeiro"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Orçamento disponível: R$ {formData.budget.toLocaleString('pt-BR')}</Label>
        <Slider
          id="budget"
          min={1000}
          max={50000}
          step={1000}
          value={[formData.budget]}
          onValueChange={(value) => handleSliderChange('budget', value)}
          className="py-4"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="days">Número de dias: {formData.days}</Label>
          <Slider
            id="days"
            min={1}
            max={30}
            step={1}
            value={[formData.days]}
            onValueChange={(value) => handleSliderChange('days', value)}
            className="py-4"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="people">Número de pessoas: {formData.people}</Label>
          <Slider
            id="people"
            min={1}
            max={10}
            step={1}
            value={[formData.people]}
            onValueChange={(value) => handleSliderChange('people', value)}
            className="py-4"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Preferências de viagem (opcional)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {['Aventura', 'Família', 'Romântico', 'Cultura', 'Gastronomia', 'Praia', 'Natureza', 'Luxo', 'Econômico'].map((pref) => (
            <div key={pref} className="flex items-center space-x-2">
              <Checkbox
                id={`pref-${pref}`}
                checked={formData.preferences.includes(pref)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange('preferences', pref, checked as boolean)
                }
              />
              <label htmlFor={`pref-${pref}`} className="text-sm cursor-pointer">
                {pref}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Restrições alimentares (opcional)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {['Vegetariano', 'Vegano', 'Sem glúten', 'Sem lactose', 'Kosher', 'Halal'].map((diet) => (
            <div key={diet} className="flex items-center space-x-2">
              <Checkbox
                id={`diet-${diet}`}
                checked={formData.dietaryRestrictions.includes(diet)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange('dietaryRestrictions', diet, checked as boolean)
                }
              />
              <label htmlFor={`diet-${diet}`} className="text-sm cursor-pointer">
                {diet}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full md:w-auto bg-travel-orange hover:bg-travel-orange/90 text-white"
        disabled={isGenerating}
      >
        {isGenerating ? 'Processando...' : 'Planejar Viagem'}
      </Button>
    </form>
  );
};

export default TripForm;
