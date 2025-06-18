
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import SignupDialog from '@/components/SignupDialog';
import LoginDialog from '@/components/LoginDialog';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Navbar = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast.success('Logout realizado com sucesso!');
  };

  return (
    <header className="py-4 border-b border-border">
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/22eff577-f06c-41d7-93cc-d35c32a0be7c.png" 
            alt="Nomade IA" 
            className="h-10"
          />
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Início
          </Link>
          <Link to="/planner" className="text-muted-foreground hover:text-foreground transition-colors">
            Planejar
          </Link>
          <Link to="/offers" className="text-muted-foreground hover:text-foreground transition-colors">
            Ofertas
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            Sobre nós
          </Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contato
          </Link>
        </nav>
        
        <div className="flex gap-2 items-center">
          {loading ? (
            <div className="text-sm text-muted-foreground">Carregando...</div>
          ) : user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden md:inline">
                Olá, {user.email}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSignOut}
              >
                Sair
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex"
                onClick={() => setIsLoginOpen(true)}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
              </Button>
              <Button 
                size="sm" 
                className="bg-nomade-orange hover:bg-nomade-orange/90"
                onClick={() => setIsSignupOpen(true)}
              >
                Criar conta
              </Button>
            </>
          )}
        </div>
      </div>
      
      <SignupDialog 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
      />
      
      <LoginDialog 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </header>
  );
};

export default Navbar;
