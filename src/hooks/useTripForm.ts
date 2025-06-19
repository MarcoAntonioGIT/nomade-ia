import { useState, useCallback } from 'react';
import { TripFormData } from '@/types';

const initialFormData: TripFormData = {
  origin: '',
  destination: '',
  budget: 5000,
  days: 5,
  people: 2,
  preferences: [],
  dietaryRestrictions: [],
};

export const useTripForm = () => {
  const [formData, setFormData] = useState<TripFormData>(initialFormData);

  const updateField = useCallback((name: keyof TripFormData, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const updateInputField = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
    resetForm,
    validateForm,
  };
}; 