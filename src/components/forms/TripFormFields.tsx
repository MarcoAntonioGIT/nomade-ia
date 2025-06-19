
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

export type TripFormData = {
  origin: string;
  destination: string;
  budget: number;
  days: number;
  people: number;
  preferences: string[];
  dietaryRestrictions: string[];
};

interface TripFormFieldsProps {
  formData: TripFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSliderChange: (name: string, value: number[]) => void;
  onCheckboxChange: (category: 'preferences' | 'dietaryRestrictions', value: string, checked: boolean) => void;
}

const TripFormFields = ({ 
  formData, 
  onInputChange, 
  onSliderChange, 
  onCheckboxChange 
}: TripFormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="origin">Cidade de origem *</Label>
          <Input
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={onInputChange}
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
            onChange={onInputChange}
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
          onValueChange={(value) => onSliderChange('budget', value)}
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
            onValueChange={(value) => onSliderChange('days', value)}
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
            onValueChange={(value) => onSliderChange('people', value)}
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

      <div className="space-y-3">
        <Label>Restrições alimentares (opcional)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {['Vegetariano', 'Vegano', 'Sem glúten', 'Sem lactose', 'Kosher', 'Halal'].map((diet) => (
            <div key={diet} className="flex items-center space-x-2">
              <Checkbox
                id={`diet-${diet}`}
                checked={formData.dietaryRestrictions.includes(diet)}
                onCheckedChange={(checked) =>
                  onCheckboxChange('dietaryRestrictions', diet, checked as boolean)
                }
              />
              <label htmlFor={`diet-${diet}`} className="text-sm cursor-pointer">
                {diet}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TripFormFields;
