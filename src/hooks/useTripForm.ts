
import { useState, useCallback } from 'react';
import { TripFormData } from '@/types';

const initialFormData: TripFormData = {
  origin: '',
  destination: '',
  budget: 5000,
  budgetText: 'R$ 5.000',
  days: 5,
  people: 2,
  preferences: [],
  dietaryRestrictions: [],
  departureDate: '',
  returnDate: '',
  additionalInfo: '',
};

export const useTripForm = () => {
  const [formData, setFormData] = useState<TripFormData>(initialFormData);

  const updateField = useCallback((name: keyof TripFormData, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const updateInputField = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateField(name as keyof TripFormData, value);
  }, [updateField]);

  const updateSliderField = useCallback((name: keyof TripFormData, value: number[]) => {
    updateField(name, value[0]);
  }, [updateField]);

  const updateCheckboxField = useCallback((
    category: 'preferences' | 'dietaryRestrictions',
    value: string,
    checked: boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [category]: checked
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value),
    }));
  }, []);

  const updateDateField = useCallback((field: 'departureDate' | 'returnDate', date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: date ? date.toISOString().split('T')[0] : '',
    }));
  }, []);

  const updateBudgetField = useCallback((budgetText: string) => {
    // Extrai o valor numérico do texto formatado
    const numbers = budgetText.replace(/\D/g, '');
    const budgetValue = numbers ? parseInt(numbers, 10) : 0;
    
    setFormData(prev => ({
      ...prev,
      budgetText,
      budget: budgetValue,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  const validateForm = useCallback((): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!formData.origin.trim()) {
      errors.push('Origem é obrigatória');
    }

    if (!formData.destination.trim()) {
      errors.push('Destino é obrigatório');
    }

    if (!formData.departureDate) {
      errors.push('Data de ida é obrigatória');
    }

    if (!formData.returnDate) {
      errors.push('Data de volta é obrigatória');
    }

    if (formData.budget < 100) {
      errors.push('Orçamento mínimo é R$ 100');
    }

    if (formData.days < 1) {
      errors.push('Mínimo de 1 dia');
    }

    if (formData.people < 1) {
      errors.push('Mínimo de 1 pessoa');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }, [formData]);

  return {
    formData,
    updateField,
    updateInputField,
    updateSliderField,
    updateCheckboxField,
    updateDateField,
    updateBudgetField,
    resetForm,
    validateForm,
  };
};
