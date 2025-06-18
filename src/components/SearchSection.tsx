
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Users, Search } from 'lucide-react';

const SearchSection = () => {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [dataIda, setDataIda] = useState('');
  const [dataVolta, setDataVolta] = useState('');
  const [passageiros, setPassageiros] = useState('1 pessoa, Econômica');

  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-orange-400 py-16">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Compare sua <br />
              <span className="text-yellow-300">Passagem Aérea</span> <br />
              pelo Site ou App
            </h1>
            <div className="inline-flex items-center bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
              em até <span className="text-3xl mx-2">10x</span> IGUAIS
            </div>
          </div>

          {/* Search Tabs */}
          <div className="flex space-x-4 mb-6">
            <Button className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              Ida e Volta
            </Button>
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
              Só Ida
            </Button>
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
              Multidestino
            </Button>
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 flex items-center">
              Voo + Hospedagem
            </Button>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">ORIGEM</label>
                <Input
                  placeholder="Caxias do Sul, Rio..."
                  value={origem}
                  onChange={(e) => setOrigem(e.target.value)}
                  className="border-gray-300"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">DESTINO</label>
                <Input
                  placeholder="Insira sua cidade..."
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  className="border-gray-300"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">DATAS</label>
                <div className="relative">
                  <Input
                    placeholder="Ida"
                    value={dataIda}
                    onChange={(e) => setDataIda(e.target.value)}
                    className="border-gray-300"
                  />
                  <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">&nbsp;</label>
                <div className="relative">
                  <Input
                    placeholder="Volta"
                    value={dataVolta}
                    onChange={(e) => setDataVolta(e.target.value)}
                    className="border-gray-300"
                  />
                  <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">PASSAGEIROS E CLASSE</label>
                <div className="relative">
                  <Input
                    placeholder="1 pessoa, Econômica"
                    value={passageiros}
                    onChange={(e) => setPassageiros(e.target.value)}
                    className="border-gray-300"
                  />
                  <Users className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <label className="flex items-center space-x-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded" />
                <span>Buscar pela data mais barata</span>
              </label>
              
              <Button className="bg-nomade-orange hover:bg-nomade-orange/90 text-white px-8">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
