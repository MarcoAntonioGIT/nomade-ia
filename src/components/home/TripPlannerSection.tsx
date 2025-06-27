
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface TripPlannerSectionProps {
  onTripGenerated?: () => void;
  onAuthRequired?: () => void;
}

const TripPlannerSection: React.FC<TripPlannerSectionProps> = ({ 
  onTripGenerated, 
  onAuthRequired 
}) => {
  const { user } = useAuth();

  const handleButtonClick = () => {
    if (!user && onAuthRequired) {
      onAuthRequired();
    } else if (onTripGenerated) {
      onTripGenerated();
    }
  };

  return (
    <section className="relative h-[480px] flex items-center bg-cover bg-center" style={{ backgroundImage: "url('/public/banner-van.jpg'), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')" }}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container flex flex-col justify-center h-full">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            Planeje experiências únicas com a IA da Nomade
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 drop-shadow">
            Descubra roteiros, ofertas e dicas personalizadas para sua próxima viagem.
          </p>
          <Button 
            size="lg" 
            className="bg-nomade-orange hover:bg-nomade-orange/90 text-white px-8 text-lg font-semibold shadow-lg"
            onClick={handleButtonClick}
          >
            Fale com a IA
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TripPlannerSection;
