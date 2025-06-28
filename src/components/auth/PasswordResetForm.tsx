
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface PasswordResetFormProps {
  onBack: () => void;
}

const PasswordResetForm = ({ onBack }: PasswordResetFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();
  
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        toast.error("Erro ao enviar email de reset", { description: error.message });
      } else {
        toast.success("Email enviado com sucesso!");
        setEmail('');
        onBack();
      }
    } catch (error) {
      toast.error("Erro inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reset-email">Email</Label>
          <Input
            id="reset-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-nomade-orange hover:bg-nomade-orange/90"
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Enviar email de reset'}
        </Button>
      </form>
      
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-gray-600 hover:underline"
        >
          ← Voltar para o login
        </button>
      </div>
    </>
  );
};

export default PasswordResetForm;
