
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Plane, Hotel, ArrowLeftRight, Calendar, Users } from 'lucide-react';

const tiposViagem = [
  { label: 'Ida e Volta', value: 'idaEVolta' },
  { label: 'Só ida', value: 'soIda' },
  { label: 'Multidestino', value: 'multidestino' },
];

const SearchFilterBar: React.FC = () => {
  const [tipoViagem, setTipoViagem] = useState('idaEVolta');
  const [vooHotel, setVooHotel] = useState(false);
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [dataIda, setDataIda] = useState('');
  const [dataVolta, setDataVolta] = useState('');
  const [passageiros, setPassageiros] = useState(1);
  const [classe, setClasse] = useState('Econômica');
  const [dataBarata, setDataBarata] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://n8n.nomadeia.com.br/webhook-test/buscar-ofertas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipoViagem, vooHotel, origem, destino, dataIda, dataVolta, passageiros, classe, dataBarata }),
      });
      const data = await res.json();
      console.log('Resultado da busca:', data);
    } catch (err) {
      alert('Erro ao buscar ofertas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-8">
      <div className="container">
        <div className="mb-6">
          <h2 className="text-white text-2xl font-bold mb-2">Passagens aéreas</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de viagem e voo+hotel */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2">
              {tiposViagem.map(tab => (
                <button
                  key={tab.value}
                  type="button"
                  className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${
                    tipoViagem === tab.value 
                      ? 'bg-white text-blue-700' 
                      : 'text-white border border-white/30 hover:bg-white/10'
                  }`}
                  onClick={() => setTipoViagem(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="h-6 w-px bg-white/30" />
            
            <button
              type="button"
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium text-sm transition-colors ${
                vooHotel 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'text-white border border-white/30 hover:bg-white/10'
              }`}
              onClick={() => setVooHotel(v => !v)}
            >
              <Plane className="w-4 h-4" />
              <span>+</span>
              <Hotel className="w-4 h-4" />
              <span>Hospedagem</span>
              {vooHotel && (
                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                  Até 30% mais barato
                </span>
              )}
            </button>
          </div>

          {/* Campos de busca */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {/* Origem e Destino */}
            <div className="lg:col-span-2 xl:col-span-2 bg-white rounded-lg p-4 flex items-center gap-2">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1 uppercase font-medium">ORIGEM</label>
                <input
                  type="text"
                  placeholder="Caxias do Sul, Rio..."
                  className="w-full text-gray-900 placeholder-gray-400 border-none outline-none font-medium"
                  value={origem}
                  onChange={e => setOrigem(e.target.value)}
                  required
                />
              </div>
              
              <button 
                type="button" 
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                onClick={() => { const o = origem; setOrigem(destino); setDestino(o); }}
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
              
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1 uppercase font-medium">DESTINO</label>
                <input
                  type="text"
                  placeholder="Insira sua cidade ..."
                  className="w-full text-gray-900 placeholder-gray-400 border-none outline-none font-medium"
                  value={destino}
                  onChange={e => setDestino(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Datas */}
            <div className="bg-white rounded-lg p-4">
              <label className="block text-xs text-gray-500 mb-1 uppercase font-medium">DATAS</label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  className="flex-1 text-gray-900 border-none outline-none font-medium"
                  value={dataIda}
                  onChange={e => setDataIda(e.target.value)}
                  required
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">Ida</div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <label className="block text-xs text-gray-500 mb-1 uppercase font-medium">&nbsp;</label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  className="flex-1 text-gray-900 border-none outline-none font-medium"
                  value={dataVolta}
                  onChange={e => setDataVolta(e.target.value)}
                  disabled={tipoViagem === 'soIda'}
                  required={tipoViagem !== 'soIda'}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">Volta</div>
            </div>

            {/* Passageiros */}
            <div className="bg-white rounded-lg p-4">
              <label className="block text-xs text-gray-500 mb-1 uppercase font-medium">PASSAGEIROS E CLASSE</label>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  min={1}
                  max={10}
                  className="w-8 text-gray-900 border-none outline-none font-medium"
                  value={passageiros}
                  onChange={e => setPassageiros(Number(e.target.value))}
                  required
                />
                <select
                  className="flex-1 text-gray-900 border-none outline-none font-medium"
                  value={classe}
                  onChange={e => setClasse(e.target.value)}
                >
                  <option value="Econômica">Econômica</option>
                  <option value="Executiva">Executiva</option>
                  <option value="Primeira">Primeira</option>
                </select>
              </div>
              <div className="text-xs text-gray-400 mt-1">1 pessoa, Econô...</div>
            </div>
          </div>

          {/* Botão de buscar e checkbox */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-white font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={dataBarata}
                onChange={e => setDataBarata(e.target.checked)}
                className="rounded border-white/30 bg-transparent text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
              />
              Buscar pela data mais barata
            </label>
            
            <Button
              type="submit"
              className="bg-nomade-orange hover:bg-nomade-orange/90 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 min-w-[140px]"
              disabled={loading}
            >
              <Search className="w-4 h-4" />
              Buscar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchFilterBar;
