
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupDialog = ({ isOpen, onClose }: SignupDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendWebhook = async (userData: { name: string; email: string }) => {
    try {
      console.log('Enviando webhook para n8n:', userData);
      
      const response = await fetch('https://n8n.nomadeia.com.br/webhook-test/cadastro-usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          timestamp: new Date().toISOString(),
          source: 'nomade-ia-signup'
        }),
      });
      
      if (response.ok) {
        console.log('Webhook enviado com sucesso');
      } else {
        console.error('Erro na resposta do webhook:', response.status);
      }
    } catch (error) {
      console.error('Erro ao enviar webhook:', error);
      // Não bloqueamos o signup se o webhook falhar
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await signUp(formData.email, formData.password);
    
    if (error) {
      console.error('Signup error:', error);
      if (error.message.includes('User already registered')) {
        toast.error('Este email já está cadastrado. Tente fazer login.');
      } else if (error.message.includes('Password should be at least')) {
        toast.error('A senha deve ter pelo menos 6 caracteres.');
      } else {
        toast.error('Erro ao criar conta. Tente novamente.');
      }
    } else {
      // Enviar webhook com os dados do usuário
      await sendWebhook({
        name: formData.name,
        email: formData.email
      });
      
      toast.success('Conta criada com sucesso! Verifique seu email para confirmar.');
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      onClose();
    }
    
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-nomade-navy">
            Criar Conta
          </DialogTitle>
          <DialogDescription>
            Junte-se ao Nomade IA e comece a planejar suas viagens dos sonhos
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Seu nome completo"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-nomade-orange hover:bg-nomade-orange/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Criando...' : 'Criar conta'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
