import { useState, useCallback } from 'react';
import { LoadingState } from '@/types';

export const useLoading = (initialState: LoadingState = { isLoading: false }) => {
  const [loadingState, setLoadingState] = useState<LoadingState>(initialState);

  const startLoading = useCallback((message?: string) => {
    setLoadingState({
      isLoading: true,
      message: message || 'Carregando...',
      progress: 0,
    });
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingState({
      isLoading: false,
      message: undefined,
      progress: undefined,
    });
  }, []);

  const updateProgress = useCallback((progress: number, message?: string) => {
    setLoadingState(prev => ({
      ...prev,
      progress,
      message: message || prev.message,
    }));
  }, []);

  const updateMessage = useCallback((message: string) => {
    setLoadingState(prev => ({
      ...prev,
      message,
    }));
  }, []);

  return {
    loadingState,
    startLoading,
    stopLoading,
    updateProgress,
    updateMessage,
  };
}; 