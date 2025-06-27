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
    <div className="bg-nomade-navy rounded-2xl shadow-lg max-w-3xl mx-auto mt-6 mb-8 px-4 py-4">
      {/* Tabs e Voo+Hotel */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1">
          {tiposViagem.map(tab => (
            <button
              key={tab.value}
              type="button"
              className={`px-3 py-1 rounded-full font-medium text-xs transition-colors ${
                tipoViagem === tab.value 
                  ? 'bg-white text-nomade-navy' 
                  : 'text-white border border-white/30 hover:bg-white/10'
              }`}
              onClick={() => setTipoViagem(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="h-4 w-px bg-white/30 mx-1" />
        <button
          type="button"
          className={`flex items-center gap-1 px-3 py-1 rounded-full font-medium text-xs transition-colors ${
            vooHotel 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'text-white border border-white/30 hover:bg-white/10'
          }`}
          onClick={() => setVooHotel(v => !v)}
        >
          <Plane className="w-3 h-3" />
          <span>+</span>
          <Hotel className="w-3 h-3" />
          <span>Hospedagem</span>
          {vooHotel && (
            <span className="ml-1 text-xs bg-green-500 text-white px-1 py-0.5 rounded-full">
              Até 30% mais barato
            </span>
          )}
        </button>
      </div>
      {/* Form principal */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row items-center gap-2">
            {/* Origem */}
            <div className="flex-1 flex items-center bg-white rounded-lg px-2 py-1 min-w-[120px]">
              <span className="mr-2 text-gray-400"><Plane className="w-4 h-4" /></span>
              <input
                type="text"
                placeholder="Origem"
                className="w-full text-gray-900 placeholder-gray-400 border-none outline-none font-medium text-sm bg-transparent"
                value={origem}
                onChange={e => setOrigem(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="ml-1 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                onClick={() => { const o = origem; setOrigem(destino); setDestino(o); }}
                tabIndex={-1}
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>
            {/* Separador */}
            <div className="hidden md:block h-8 w-px bg-gray-200 mx-1" />
            {/* Destino */}
            <div className="flex-1 flex items-center bg-white rounded-lg px-2 py-1 min-w-[120px] mt-2 md:mt-0">
              <span className="mr-2 text-gray-400"><Plane className="w-4 h-4 rotate-90" /></span>
              <input
                type="text"
                placeholder="Destino"
                className="w-full text-gray-900 placeholder-gray-400 border-none outline-none font-medium text-sm bg-transparent"
                value={destino}
                onChange={e => setDestino(e.target.value)}
                required
              />
            </div>
            {/* Separador */}
            <div className="hidden md:block h-8 w-px bg-gray-200 mx-1" />
            {/* Datas */}
            <div className="flex items-center bg-white rounded-lg px-2 py-1 min-w-[120px] mt-2 md:mt-0">
              <span className="mr-2 text-gray-400"><Calendar className="w-4 h-4" /></span>
              <input
                type="date"
                className="text-gray-900 border-none outline-none font-medium text-sm bg-transparent w-[90px]"
                value={dataIda}
                onChange={e => setDataIda(e.target.value)}
                required
              />
              <span className="mx-1 text-gray-400">-</span>
              <input
                type="date"
                className="text-gray-900 border-none outline-none font-medium text-sm bg-transparent w-[90px]"
                value={dataVolta}
                onChange={e => setDataVolta(e.target.value)}
                disabled={tipoViagem === 'soIda'}
                required={tipoViagem !== 'soIda'}
              />
            </div>
            {/* Separador */}
            <div className="hidden md:block h-8 w-px bg-gray-200 mx-1" />
            {/* Passageiros e classe */}
            <div className="flex items-center bg-white rounded-lg px-2 py-1 min-w-[120px] mt-2 md:mt-0">
              <span className="mr-2 text-gray-400"><Users className="w-4 h-4" /></span>
              <input
                type="number"
                min={1}
                max={10}
                className="w-8 text-gray-900 border-none outline-none font-medium text-sm bg-transparent"
                value={passageiros}
                onChange={e => setPassageiros(Number(e.target.value))}
                required
              />
              <select
                className="ml-2 flex-1 text-gray-900 border-none outline-none font-medium text-sm bg-transparent"
                value={classe}
                onChange={e => setClasse(e.target.value)}
              >
                <option value="Econômica">Econômica</option>
                <option value="Executiva">Executiva</option>
                <option value="Primeira">Primeira</option>
              </select>
            </div>
            {/* Botão de busca */}
            <Button
              type="submit"
              className="ml-0 md:ml-2 bg-nomade-orange hover:bg-nomade-orange/90 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 min-w-[100px] text-base shadow-md"
              disabled={loading}
            >
              <Search className="w-4 h-4" />
              Buscar
            </Button>
          </div>
          {/* Checkbox */}
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={dataBarata}
              onChange={e => setDataBarata(e.target.checked)}
              className="rounded border-white/30 bg-transparent text-blue-500 focus:ring-blue-500 focus:ring-offset-0 mr-2"
              id="dataBarata"
            />
            <label htmlFor="dataBarata" className="text-white font-medium text-xs cursor-pointer">
              Buscar pela data mais barata
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilterBar;
