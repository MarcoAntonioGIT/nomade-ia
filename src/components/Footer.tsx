
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-nomade-navy text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src="/logo-branca.png" 
                alt="Nomade IA" 
                className="h-8 mr-3"
              />
              <h3 className="font-bold text-xl">Nomade IA</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Revolucionando a forma como você planeja suas viagens com inteligência artificial. 
              Criamos experiências únicas e personalizadas para cada viajante.
            </p>
            <div className="flex space-x-4">
              {/* Instagram */}
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.447c-3.116 0-3.478.011-4.694.067-2.9.132-4.208 1.44-4.34 4.339-.057 1.22-.066 1.58-.066 4.64s.009 3.42.066 4.64c.132 2.9 1.439 4.208 4.34 4.34 1.216.056 1.577.067 4.694.067 3.116 0 3.478-.011 4.694-.067 2.9-.132 4.208-1.44 4.34-4.34.057-1.22.066-1.58.066-4.64s-.009-3.42-.066-4.64c-.132-2.9-1.44-4.208-4.34-4.339-1.216-.056-1.578-.067-4.694-.067zM12 6.883c-2.826 0-5.117 2.291-5.117 5.117s2.291 5.117 5.117 5.117 5.117-2.291 5.117-5.117S14.826 6.883 12 6.883zm0 8.533c-1.886 0-3.417-1.531-3.417-3.417s1.531-3.417 3.417-3.417 3.417 1.531 3.417 3.417-1.531 3.417-3.417 3.417zm4.938-7.983c-.783 0-1.417.634-1.417 1.417s.634 1.417 1.417 1.417 1.417-.634 1.417-1.417-.634-1.417-1.417-1.417z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.028C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Entre em Contato</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-3 text-nomade-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contato@nomadeia.com.br
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-3 text-nomade-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +55 (11) 9999-9999
              </div>
              <div className="flex items-start">
                <svg className="w-4 h-4 mr-3 mt-0.5 text-nomade-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <div>R da Ajuda, 35 – Sala 1205</div>
                  <div>Centro, Rio de Janeiro – RJ</div>
                  <div>20040-915</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Nossos Serviços</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/planner" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <span className="w-2 h-2 bg-nomade-orange rounded-full mr-3"></span>
                  Planejamento de Viagens
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <span className="w-2 h-2 bg-nomade-orange rounded-full mr-3"></span>
                  Ofertas Especiais
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <span className="w-2 h-2 bg-nomade-orange rounded-full mr-3"></span>
                  Pacotes Personalizados
                </Link>
              </li>
              <li>
                <Link to="/itinerary" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <span className="w-2 h-2 bg-nomade-orange rounded-full mr-3"></span>
                  Roteiros Inteligentes
                </Link>
              </li>
              <li>
                <Link to="/my-trips" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <span className="w-2 h-2 bg-nomade-orange rounded-full mr-3"></span>
                  Minhas Viagens
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Suporte & Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <span className="w-2 h-2 bg-nomade-orange rounded-full mr-3"></span>
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <span className="w-2 h-2 bg-nomade-orange rounded-full mr-3"></span>
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <span className="w-2 h-2 bg-nomade-orange rounded-full mr-3"></span>
                  Parceiros
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <span className="w-2 h-2 bg-nomade-orange rounded-full mr-3"></span>
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <span className="w-2 h-2 bg-nomade-orange rounded-full mr-3"></span>
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <span className="w-2 h-2 bg-nomade-orange rounded-full mr-3"></span>
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-2 md:mb-0">
              <p>&copy; {new Date().getFullYear()} Nomade IA. Todos os direitos reservados.</p>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-6 text-sm text-gray-400 text-center">
              <span>CNPJ: 61.434.576/0001-51</span>
              <span>NOMADE IA TURISMO E TECNOLOGIA LTDA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
