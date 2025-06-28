
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface SignupFormProps {
  onClose: () => void;
}

const SignupForm = ({ onClose }: SignupFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (form.password.length < 6) {
        toast.error("Senha muito curta", {
          description: "A senha deve ter pelo menos 6 caracteres.",
        });
        setIsLoading(false);
        return;
      }

      const { error } = await signUp(form.email, form.password, form.fullName);
      
      if (error) {
        toast.error("Erro ao criar conta", { description: error.message });
      } else {
        toast.success("Conta criada com sucesso!");
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
        <Label htmlFor="name">Nome completo</Label>
        <Input
          id="name"
          type="text"
          value={form.fullName}
          onChange={(e) => setForm(prev => ({ ...prev, fullName: e.target.value }))}
          placeholder="Seu nome completo"
          required
        />
      </div>

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
          placeholder="Mínimo 6 caracteres"
          required
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-nomade-orange hover:bg-nomade-orange/90"
        disabled={isLoading}
      >
        {isLoading ? 'Criando...' : 'Criar conta'}
      </Button>
    </form>
  );
};

export default SignupForm;
