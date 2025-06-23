import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import LoadingSpinner from '@/components/ui/loading-spinner';

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidSession, setIsValidSession] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setIsValidSession(true);
      } else {
        // Check if we have access token in URL (from password reset email)
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        
        if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          
          if (data.session) {
            setIsValidSession(true);
          } else {
            toast.error("Link inválido", {
              description: "O link de redefinição de senha é inválido ou expirou.",
            });
            navigate('/auth');
          }
        } else {
          toast.error("Link inválido", {
            description: "O link de redefinição de senha é inválido ou expirou.",
          });
          navigate('/auth');
        }
      }
    };

    checkSession();
  }, [searchParams, navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Senhas não coincidem", {
        description: "As senhas digitadas não são iguais.",
      });
      return;
    }

    if (password.length < 6) {
      toast.error("Senha muito curta", {
        description: "A senha deve ter pelo menos 6 caracteres.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        toast.error("Erro ao redefinir senha", { description: error.message });
      } else {
        toast.success("Senha redefinida com sucesso!", {
          description: "Sua senha foi atualizada. Você pode fazer login agora.",
        });
        navigate('/auth');
      }
    } catch (error) {
      toast.error("Erro inesperado", {
        description: "Ocorreu um erro ao redefinir sua senha. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <LoadingSpinner 
              title="Verificando link"
              description="Aguarde um momento..."
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/">
            <img 
              src="/logo-nomade.png" 
              alt="Nomade IA" 
              className="h-12 mx-auto"
            />
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Redefinir senha
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Digite sua nova senha
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Nova senha</CardTitle>
            <CardDescription>
              Escolha uma nova senha para sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova senha</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Digite a senha novamente"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-nomade-orange hover:bg-nomade-orange/90"
                disabled={isLoading}
              >
                {isLoading ? 'Redefinindo...' : 'Redefinir senha'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/auth" className="text-sm text-nomade-orange hover:underline">
            ← Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 