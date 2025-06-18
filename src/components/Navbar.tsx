
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SignupDialog from '@/components/SignupDialog';

const Navbar = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

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
          <Link to="/my-trips" className="text-muted-foreground hover:text-foreground transition-colors">
            Minhas Viagens
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
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            Entrar
          </Button>
          <Button 
            size="sm" 
            className="bg-nomade-orange hover:bg-nomade-orange/90"
            onClick={() => setIsSignupOpen(true)}
          >
            Criar conta
          </Button>
        </div>
      </div>
      
      <SignupDialog 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
      />
    </header>
  );
};

export default Navbar;
