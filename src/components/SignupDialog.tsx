
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupDialog = ({ isOpen, onClose }: SignupDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-nomade-navy">
            Autenticação Necessária
          </DialogTitle>
          <DialogDescription>
            Para usar esta funcionalidade, você precisa estar logado na sua conta.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button 
            className="flex-1 bg-nomade-orange hover:bg-nomade-orange/90"
            asChild
          >
            <Link to="/auth">Fazer Login</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
