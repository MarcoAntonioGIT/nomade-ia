
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
    <div className="bg-nomade-navy rounded-3xl shadow-2xl max-w-5xl mx-auto mt-8 mb-12 px-8 py-8">
      {/* Tabs e Voo+Hotel */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex gap-2">
          {tiposViagem.map(tab => (
            <button
              key={tab.value}
              type="button"
              className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
                tipoViagem === tab.value 
                  ? 'bg-white text-nomade-navy shadow-md' 
                  : 'text-white border border-white/30 hover:bg-white/10'
              }`}
              onClick={() => setTipoViagem(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="h-6 w-px bg-white/30 mx-2" />
        <button
          type="button"
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition-colors ${
            vooHotel 
              ? 'bg-green-100 text-green-700 border border-green-200 shadow-md' 
              : 'text-white border border-white/30 hover:bg-white/10'
          }`}
          onClick={() => setVooHotel(v => !v)}
        >
          <Plane className="w-4 h-4" />
          <span>+</span>
          <Hotel className="w-4 h-4" />
          <span>Hospedagem</span>
          {vooHotel && (
            <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
              Até 30% mais barato
            </span>
          )}
        </button>
      </div>

      {/* Form principal */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            {/* Origem */}
            <div className="flex-1 flex items-center bg-white rounded-xl px-4 py-3 min-w-[180px] shadow-sm">
              <span className="mr-3 text-gray-400"><Plane className="w-5 h-5" /></span>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Origem</label>
                <input
                  type="text"
                  placeholder="De onde você vai sair?"
                  className="w-full text-gray-900 placeholder-gray-400 border-none outline-none font-medium text-base bg-transparent"
                  value={origem}
                  onChange={e => setOrigem(e.target.value)}
                  required
                />
              </div>
              <button 
                type="button" 
                className="ml-2 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                onClick={() => { const o = origem; setOrigem(destino); setDestino(o); }}
                tabIndex={-1}
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
            </div>

            {/* Destino */}
            <div className="flex-1 flex items-center bg-white rounded-xl px-4 py-3 min-w-[180px] shadow-sm">
              <span className="mr-3 text-gray-400"><Plane className="w-5 h-5 rotate-90" /></span>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Destino</label>
                <input
                  type="text"
                  placeholder="Para onde você quer ir?"
                  className="w-full text-gray-900 placeholder-gray-400 border-none outline-none font-medium text-base bg-transparent"
                  value={destino}
                  onChange={e => setDestino(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Data de Ida */}
            <div className="flex items-center bg-white rounded-xl px-4 py-3 min-w-[160px] shadow-sm">
              <span className="mr-3 text-gray-400"><Calendar className="w-5 h-5" /></span>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Ida</label>
                <input
                  type="date"
                  className="w-full text-gray-900 border-none outline-none font-medium text-base bg-transparent"
                  value={dataIda}
                  onChange={e => setDataIda(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Data de Volta */}
            {tipoViagem !== 'soIda' && (
              <div className="flex items-center bg-white rounded-xl px-4 py-3 min-w-[160px] shadow-sm">
                <span className="mr-3 text-gray-400"><Calendar className="w-5 h-5" /></span>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Volta</label>
                  <input
                    type="date"
                    className="w-full text-gray-900 border-none outline-none font-medium text-base bg-transparent"
                    value={dataVolta}
                    onChange={e => setDataVolta(e.target.value)}
                    required={tipoViagem !== 'soIda'}
                  />
                </div>
              </div>
            )}

            {/* Passageiros */}
            <div className="flex items-center bg-white rounded-xl px-4 py-3 min-w-[120px] shadow-sm">
              <span className="mr-3 text-gray-400"><Users className="w-5 h-5" /></span>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Passageiros</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  className="w-full text-gray-900 border-none outline-none font-medium text-base bg-transparent"
                  value={passageiros}
                  onChange={e => setPassageiros(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            {/* Classe */}
            <div className="flex items-center bg-white rounded-xl px-4 py-3 min-w-[140px] shadow-sm">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Classe</label>
                <select
                  className="w-full text-gray-900 border-none outline-none font-medium text-base bg-transparent"
                  value={classe}
                  onChange={e => setClasse(e.target.value)}
                >
                  <option value="Econômica">Econômica</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Executiva">Executiva</option>
                  <option value="Primeira Classe">Primeira Classe</option>
                </select>
              </div>
            </div>

            {/* Botão de busca */}
            <Button
              type="submit"
              className="bg-nomade-orange hover:bg-nomade-orange/90 text-white px-8 py-6 rounded-xl font-bold flex items-center gap-3 min-w-[140px] text-lg shadow-lg hover:shadow-xl transition-all"
              disabled={loading}
            >
              <Search className="w-5 h-5" />
              {loading ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>

          {/* Checkbox */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={dataBarata}
              onChange={e => setDataBarata(e.target.checked)}
              className="rounded border-white/30 bg-transparent text-nomade-orange focus:ring-nomade-orange focus:ring-offset-0 mr-3 w-4 h-4"
              id="dataBarata"
            />
            <label htmlFor="dataBarata" className="text-white font-medium text-sm cursor-pointer">
              Buscar pela data mais barata (± 3 dias)
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilterBar;
