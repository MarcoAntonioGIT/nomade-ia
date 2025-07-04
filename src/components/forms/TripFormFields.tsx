import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ArrowLeftRight } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { TripFormData } from '@/types';

interface TripFormFieldsProps {
  formData: TripFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSliderChange: (name: string, value: number[]) => void;
  onCheckboxChange: (category: 'preferences', value: string, checked: boolean) => void;
  onDateChange?: (field: 'departureDate' | 'returnDate', date: Date | undefined) => void;
  onBudgetChange?: (value: string) => void;
  onSwapOriginDestination?: () => void;
}

const formatCurrency = (value: string): string => {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, '');
  
  // Limita a 6 dígitos (999.999)
  const limitedNumbers = numbers.slice(0, 6);
  
  if (limitedNumbers === '') return '';
  
  // Converte para número e formata
  const numberValue = parseInt(limitedNumbers, 10);
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numberValue);
};

const TripFormFields = ({ 
  formData, 
  onInputChange, 
  onSliderChange, 
  onCheckboxChange,
  onDateChange,
  onBudgetChange,
  onSwapOriginDestination
}: TripFormFieldsProps) => {
  const handleBudgetInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    if (onBudgetChange) {
      onBudgetChange(formatted);
    }
  };

  const parseDateFromString = (dateString?: string): Date | undefined => {
    if (!dateString) return undefined;
    
    // Parse a data no formato YYYY-MM-DD considerando o fuso horário local
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // month - 1 porque Date usa 0-based months
  };

  return (
    <div className="space-y-6">
      {/* Seção de Ida e Volta */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="space-y-2">
          <Label htmlFor="origin">Origem *</Label>
          <Input
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={onInputChange}
            placeholder="Ex: São Paulo"
            required
            className="h-12"
          />
        </div>

        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onSwapOriginDestination}
            className="h-12 w-12 rounded-full hover:bg-gray-100"
            title="Trocar origem e destino"
          >
            <ArrowLeftRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination">Destino *</Label>
          <Input
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={onInputChange}
            placeholder="Ex: Rio de Janeiro"
            required
            className="h-12"
          />
        </div>
      </div>

      {/* Seção de Datas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Data de ida *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 justify-start text-left font-normal",
                  !formData.departureDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.departureDate ? (
                  format(new Date(formData.departureDate), "dd/MM/yyyy")
                ) : (
                  <span>Selecione a data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={parseDateFromString(formData.departureDate)}
                onSelect={(date) => onDateChange?.('departureDate', date)}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Data de volta *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 justify-start text-left font-normal",
                  !formData.returnDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.returnDate ? (
                  format(new Date(formData.returnDate), "dd/MM/yyyy")
                ) : (
                  <span>Selecione a data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={parseDateFromString(formData.returnDate)}
                onSelect={(date) => onDateChange?.('returnDate', date)}
                disabled={(date) => 
                  date < new Date() || 
                  (formData.departureDate && date <= (parseDateFromString(formData.departureDate) || new Date()))
                }
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Orçamento */}
      <div className="space-y-2">
        <Label htmlFor="budget">Orçamento disponível *</Label>
        <Input
          id="budget"
          name="budgetText"
          value={formData.budgetText}
          onChange={handleBudgetInputChange}
          placeholder="R$ 0"
          className="h-12 text-lg"
        />
        <p className="text-sm text-muted-foreground">
          Limite máximo: R$ 999.999
        </p>
      </div>

      {/* Número de pessoas */}
      <div className="space-y-2">
        <Label htmlFor="people">Número de pessoas: {formData.people}</Label>
        <Slider
          id="people"
          min={1}
          max={10}
          step={1}
          value={[formData.people]}
          onValueChange={(value) => onSliderChange('people', value)}
          className="py-4"
        />
      </div>

      {/* Preferências */}
      <div className="space-y-3">
        <Label>Preferências de viagem (opcional)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {['Aventura', 'Família', 'Romântico', 'Cultura', 'Gastronomia', 'Praia', 'Natureza', 'Luxo', 'Econômico'].map((pref) => (
            <div key={pref} className="flex items-center space-x-2">
              <Checkbox
                id={`pref-${pref}`}
                checked={formData.preferences.includes(pref)}
                onCheckedChange={(checked) =>
                  onCheckboxChange('preferences', pref, checked as boolean)
                }
              />
              <label htmlFor={`pref-${pref}`} className="text-sm cursor-pointer">
                {pref}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Informações adicionais */}
      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Informações adicionais (opcional)</Label>
        <Textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo || ''}
          onChange={onInputChange}
          placeholder="Conte-nos mais sobre suas preferências, necessidades especiais, ou qualquer informação que possa nos ajudar a criar o roteiro perfeito para você..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default TripFormFields;
