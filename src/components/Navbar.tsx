
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <header className="py-4 border-b border-border">
      <div className="container flex justify-between items-center">
        <Link to="/" className="font-heading font-bold text-2xl text-nomade-turquoise">
          Nomade IA
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
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            Entrar
          </Button>
          <Button size="sm" className="bg-nomade-orange hover:bg-nomade-orange/90">
            Criar conta
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
