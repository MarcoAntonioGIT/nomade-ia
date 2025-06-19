
import React from 'react';

interface LoadingSpinnerProps {
  title?: string;
  description?: string;
  className?: string;
}

const LoadingSpinner = ({ 
  title = "Carregando...", 
  description,
  className = "min-h-[400px]"
}: LoadingSpinnerProps) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className} space-y-4`}>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nomade-orange"></div>
      <h2 className="text-2xl font-semibold text-center">{title}</h2>
      {description && (
        <p className="text-muted-foreground text-center">{description}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
