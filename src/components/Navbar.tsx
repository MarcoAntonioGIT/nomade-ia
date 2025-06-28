import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SearchModal from './SearchModal';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [defaultAuthTab, setDefaultAuthTab] = useState<'login' | 'signup'>('login');

  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.full_name || user.email || 'User';
  };

  const handleLoginClick = () => {
    setDefaultAuthTab('login');
    setIsAuthOpen(true);
  };

  const handleSignupClick = () => {
    setDefaultAuthTab('signup');
    setIsAuthOpen(true);
  };

  return (
    <>
      <header className="py-4 border-b border-border">
        <div className="container flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/logo-nomade.png" 
              alt="Nomade IA" 
              className="h-14"
            />
          </Link>
          
          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Início
            </Link>
            {user && (
              <Link to="/my-trips" className="text-muted-foreground hover:text-foreground transition-colors">
                Minhas Viagens
              </Link>
            )}
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
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsSearchOpen(true)}
              className="p-2"
            >
              <Search className="h-4 w-4" />
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">
                      {getUserDisplayName()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/my-trips" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Minhas Viagens
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  size="sm" 
                  onClick={handleLoginClick}
                >
                  Entrar
                </Button>
                <Button 
                  size="sm" 
                  className="bg-nomade-orange hover:bg-nomade-orange/90" 
                  onClick={handleSignupClick}
                >
                  Criar conta
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        defaultTab={defaultAuthTab}
      />
    </>
  );
};

export default Navbar;
