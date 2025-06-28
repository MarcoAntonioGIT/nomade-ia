
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface LoginFormProps {
  onClose: () => void;
  onShowReset: () => void;
}

const LoginForm = ({ onClose, onShowReset }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(form.email, form.password);
      
      if (error) {
        toast.error("Erro ao fazer login", { description: error.message });
      } else {
        toast.success("Login realizado com sucesso!");
        onClose();
      }
    } catch (error) {
      toast.error("Erro inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
          placeholder="seu@email.com"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          value={form.password}
          onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
          placeholder="Sua senha"
          required
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-nomade-orange hover:bg-nomade-orange/90"
        disabled={isLoading}
      >
        {isLoading ? 'Entrando...' : 'Entrar'}
      </Button>
      
      <div className="text-center">
        <button
          type="button"
          onClick={onShowReset}
          className="text-sm text-nomade-orange hover:underline"
        >
          Esqueceu a senha?
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
