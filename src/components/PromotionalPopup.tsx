
import React, { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PromotionalPopupProps {
  onClose?: () => void;
}

const PromotionalPopup: React.FC<PromotionalPopupProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Verificar se já foi mostrado nesta sessão
    const popupShown = sessionStorage.getItem('promotional-popup-shown');
    if (popupShown) {
      setHasShown(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let inactivityTimeout: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimeout);
      if (!hasShown) {
        inactivityTimeout = setTimeout(() => {
          setIsOpen(true);
          setHasShown(true);
          sessionStorage.setItem('promotional-popup-shown', 'true');
        }, 30000); // 30 segundos
      }
    };

    const handleActivity = () => {
      resetInactivityTimer();
    };

    // Eventos de atividade do usuário
    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('keypress', handleActivity);
    document.addEventListener('scroll', handleActivity);
    document.addEventListener('click', handleActivity);

    // Iniciar o timer
    resetInactivityTimer();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(inactivityTimeout);
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keypress', handleActivity);
      document.removeEventListener('scroll', handleActivity);
      document.removeEventListener('click', handleActivity);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleClaim = () => {
    // Aqui você pode implementar a lógica de cadastro ou redirecionamento
    console.log('Usuário clicou para resgatar o desconto');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-0 p-0 overflow-hidden">
        <div className="relative bg-gradient-to-br from-nomade-orange via-nomade-orange to-red-500 text-white p-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <div className="mb-4">
              <Gift className="w-16 h-16 mx-auto text-yellow-300" />
            </div>
            
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-white mb-2">
                🎁 Oferta Especial!
              </DialogTitle>
              <p className="text-yellow-100 text-lg">
                Ganhe R$100 de desconto na sua primeira viagem!
              </p>
            </DialogHeader>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
              <p className="text-yellow-100 text-sm mb-2">
                ⏰ Oferta por tempo limitado
              </p>
              <p className="text-white font-semibold">
                Válido apenas para novos usuários
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleClaim}
                className="w-full bg-white text-nomade-orange hover:bg-gray-100 font-bold text-lg py-3"
              >
                Resgatar Desconto Agora
              </Button>
              
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white text-sm underline"
              >
                Talvez mais tarde
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromotionalPopup;
