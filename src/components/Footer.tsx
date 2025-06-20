
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-nomade-navy text-white py-8 mt-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Nomade IA</h3>
            <p className="text-gray-300 text-sm">
              Viagens personalizadas com a ajuda de inteligência artificial para proporcionar
              experiências únicas e inesquecíveis.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-base mb-3">Navegação</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/planner" className="text-sm text-gray-300 hover:text-white transition-colors">Planejar viagem</Link></li>
              <li><Link to="/offers" className="text-sm text-gray-300 hover:text-white transition-colors">Ofertas especiais</Link></li>
              <li><Link to="/about" className="text-sm text-gray-300 hover:text-white transition-colors">Sobre nós</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-base mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sm text-gray-300 hover:text-white transition-colors">Termos de uso</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-300 hover:text-white transition-colors">Política de privacidade</Link></li>
              <li><Link to="/cookies" className="text-sm text-gray-300 hover:text-white transition-colors">Política de cookies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-base mb-3">Contato</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300">contato@nomadeia.com.br</li>
              <li className="text-sm text-gray-300">+55 (11) 9999-9999</li>
              <li className="text-sm text-gray-300">São Paulo, Brasil</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-6 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Nomade IA. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
