
import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Calendar, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  destination: string;
  type: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Dados de exemplo para demonstração
  const mockOffers: SearchResult[] = [
    {
      id: '1',
      title: 'Pacote para Porto Seguro',
      description: '11 dias / 10 noites - Hotel + Aéreo',
      price: 1980,
      originalPrice: 2798,
      image: '/offer-images/imagem-fernando-de-noronha.png',
      destination: 'Porto Seguro',
      type: 'Pacote'
    },
    {
      id: '2',
      title: 'Passagem para Santiago',
      description: 'Ida e volta saindo de São Paulo',
      price: 1043,
      image: '/offer-images/passagens-aereas.png',
      destination: 'Santiago',
      type: 'Passagem'
    },
    {
      id: '3',
      title: 'Pacote Disney',
      description: '15 dias / 14 noites - Hotel + Aéreo + Ingressos',
      price: 4599,
      originalPrice: 5999,
      image: '/offer-images/voos-disney.png',
      destination: 'Orlando',
      type: 'Pacote'
    },
    {
      id: '4',
      title: 'Europa Multi-destinos',
      description: 'Londres + Paris + Roma - 21 dias',
      price: 6299,
      originalPrice: 7850,
      image: '/offer-images/voos-europa.png',
      destination: 'Europa',
      type: 'Pacote'
    },
    {
      id: '5',
      title: 'Fernando de Noronha',
      description: '8 dias / 7 noites - Pousada + Aéreo',
      price: 2299,
      originalPrice: 3499,
      image: '/offer-images/imagem-fernando-de-noronha.png',
      destination: 'Fernando de Noronha',
      type: 'Pacote'
    }
  ];

  const performSearch = async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    
    try {
      // Simular busca na API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const filteredResults = mockOffers.filter(offer =>
        offer.title.toLowerCase().includes(term.toLowerCase()) ||
        offer.description.toLowerCase().includes(term.toLowerCase()) ||
        offer.destination.toLowerCase().includes(term.toLowerCase()) ||
        offer.type.toLowerCase().includes(term.toLowerCase())
      );

      setResults(filteredResults);
    } catch (error) {
      console.error('Erro na busca:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleClose = () => {
    setSearchTerm('');
    setResults([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Buscar Ofertas
          </DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Digite o destino, tipo de viagem ou palavra-chave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-base"
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                Buscando ofertas...
              </div>
            </div>
          )}

          {!loading && searchTerm && results.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Nenhuma oferta encontrada para "{searchTerm}"</p>
              <p className="text-sm mt-1">Tente buscar por destinos como "Porto Seguro", "Europa" ou "Disney"</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-3 mt-4">
              <p className="text-sm text-gray-600">
                {results.length} oferta{results.length !== 1 ? 's' : ''} encontrada{results.length !== 1 ? 's' : ''}
              </p>
              
              {results.map((offer) => (
                <Card key={offer.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={offer.image} 
                          alt={offer.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <Badge variant="secondary" className="text-xs mb-1">
                              {offer.type}
                            </Badge>
                            <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                              {offer.title}
                            </h3>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                              {offer.description}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <MapPin className="w-3 h-3" />
                              {offer.destination}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            {offer.originalPrice && (
                              <p className="text-xs text-gray-400 line-through">
                                R$ {offer.originalPrice.toLocaleString('pt-BR')}
                              </p>
                            )}
                            <p className="font-bold text-lg text-nomade-orange">
                              R$ {offer.price.toLocaleString('pt-BR')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!searchTerm && (
            <div className="text-center py-8 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Digite algo para começar a buscar</p>
              <p className="text-sm mt-1">Experimente: "Porto Seguro", "Europa", "Disney"</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
