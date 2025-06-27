
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
    <div className="bg-nomade-navy rounded-3xl shadow-2xl max-w-6xl mx-auto mt-8 mb-12 px-6 py-6">
      {/* Tabs e Voo+Hotel */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex gap-2">
          {tiposViagem.map(tab => (
            <button
              key={tab.value}
              type="button"
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
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
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-colors ${
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
          {/* Primeira linha com campos principais */}
          <div className="flex flex-col xl:flex-row items-stretch gap-3">
            {/* Origem e Destino Agrupados */}
            <div className="flex flex-1 bg-white rounded-xl shadow-sm overflow-hidden h-14">
              {/* Origem */}
              <div className="flex-1 flex items-center px-3 py-2">
                <span className="mr-2 text-gray-400"><Plane className="w-4 h-4" /></span>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-0.5">ORIGEM</label>
                  <input
                    type="text"
                    placeholder="Caxias do Sul, Rio..."
                    className="w-full text-gray-900 placeholder-gray-400 border-none outline-none font-medium text-sm bg-transparent"
                    value={origem}
                    onChange={e => setOrigem(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              {/* Botão de troca */}
              <div className="flex items-center justify-center px-2">
                <button 
                  type="button" 
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  onClick={() => { const o = origem; setOrigem(destino); setDestino(o); }}
                  tabIndex={-1}
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
              </div>

              {/* Destino */}
              <div className="flex-1 flex items-center px-3 py-2">
                <span className="mr-2 text-gray-400"><Plane className="w-4 h-4 rotate-90" /></span>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-0.5">DESTINO</label>
                  <input
                    type="text"
                    placeholder="Gramado, Rio Gra..."
                    className="w-full text-gray-900 placeholder-gray-400 border-none outline-none font-medium text-sm bg-transparent"
                    value={destino}
                    onChange={e => setDestino(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Datas Agrupadas */}
            <div className="flex bg-white rounded-xl shadow-sm overflow-hidden h-14">
              {/* Data de Ida */}
              <div className="flex items-center px-3 py-2 min-w-[110px]">
                <span className="mr-2 text-gray-400"><Calendar className="w-4 h-4" /></span>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-0.5">DATAS</label>
                  <input
                    type="date"
                    className="w-full text-gray-900 border-none outline-none font-medium text-xs bg-transparent"
                    value={dataIda}
                    onChange={e => setDataIda(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Data de Volta */}
              <div className={`flex items-center px-3 py-2 min-w-[110px] ${tipoViagem === 'soIda' ? 'bg-gray-100' : ''}`}>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-0.5">3 DIAS</label>
                  <input
                    type="date"
                    className={`w-full border-none outline-none font-medium text-xs bg-transparent ${
                      tipoViagem === 'soIda' ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'
                    }`}
                    value={dataVolta}
                    onChange={e => setDataVolta(e.target.value)}
                    required={tipoViagem !== 'soIda'}
                    disabled={tipoViagem === 'soIda'}
                  />
                </div>
              </div>
            </div>

            {/* Passageiros e Classe */}
            <div className="flex items-center bg-white rounded-xl px-3 py-2 shadow-sm min-w-[160px] h-14">
              <span className="mr-2 text-gray-400"><Users className="w-4 h-4" /></span>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-0.5">PASSAGEIROS E CLASSE</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={10}
                    className="w-4 text-gray-900 border-none outline-none font-medium text-xs bg-transparent"
                    value={passageiros}
                    onChange={e => setPassageiros(Number(e.target.value))}
                    required
                  />
                  <span className="text-xs text-gray-600">pessoa, </span>
                  <select
                    className="text-gray-900 border-none outline-none font-medium text-xs bg-transparent"
                    value={classe}
                    onChange={e => setClasse(e.target.value)}
                  >
                    <option value="Econômica">Econô...</option>
                    <option value="Premium Economy">Premium</option>
                    <option value="Executiva">Executiva</option>
                    <option value="Primeira Classe">Primeira</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Botão de busca */}
            <div className="flex items-center">
              <Button
                type="submit"
                className="bg-nomade-orange hover:bg-nomade-orange/90 text-white px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-xl transition-all h-14"
                disabled={loading}
              >
                <Search className="w-4 h-4" />
                {loading ? 'Buscando...' : 'Buscar'}
              </Button>
            </div>
          </div>

          {/* Pill toggle na parte inferior */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                dataBarata 
                  ? 'bg-white text-nomade-navy shadow-md' 
                  : 'bg-white/10 text-white border border-white/30 hover:bg-white/20'
              }`}
              onClick={() => setDataBarata(!dataBarata)}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                dataBarata 
                  ? 'border-nomade-navy bg-nomade-navy' 
                  : 'border-white'
              }`}>
                {dataBarata && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              Buscar pela data mais barata
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilterBar;
