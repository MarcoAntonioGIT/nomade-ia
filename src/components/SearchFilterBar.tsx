import React, { useState } from 'react';

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
    <div className="w-full flex justify-center bg-[#0070e0] py-8 shadow-md">
      <form onSubmit={handleSubmit} className="w-full max-w-5xl flex flex-col gap-4">
        <div className="flex flex-wrap gap-2 mb-2 items-center">
          <div className="flex gap-2 bg-white rounded-full p-1">
            {tiposViagem.map(tab => (
              <button
                key={tab.value}
                type="button"
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${tipoViagem === tab.value ? 'bg-[#0070e0] text-white' : 'text-[#0070e0] bg-white hover:bg-blue-100'}`}
                onClick={() => setTipoViagem(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm border-2 transition-colors ml-2 ${vooHotel ? 'bg-green-100 border-green-500 text-green-700' : 'bg-white border-[#0070e0] text-[#0070e0]'}`}
            onClick={() => setVooHotel(v => !v)}
          >
            <span role="img" aria-label="voo">✈️</span> + <span role="img" aria-label="hotel">🏨</span> Hospedagem
            {vooHotel && <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Até 30% mais barato</span>}
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-2 bg-white rounded-2xl p-6 items-center shadow-lg">
          <div className="flex flex-col md:flex-row gap-2 flex-1 w-full">
            <div className="flex items-center bg-gray-50 rounded-lg px-3 py-3 flex-1 min-w-[180px]">
              <span className="mr-2 text-gray-400">●</span>
              <input
                type="text"
                placeholder="Origem"
                className="bg-transparent border-none outline-none w-full font-semibold"
                value={origem}
                onChange={e => setOrigem(e.target.value)}
                required
              />
              <button type="button" className="mx-2 text-gray-400 hover:text-primary" tabIndex={-1} onClick={() => { const o = origem; setOrigem(destino); setDestino(o); }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="3 16 3 21 8 21"/></svg>
              </button>
            </div>
            <div className="flex items-center bg-gray-50 rounded-lg px-3 py-3 flex-1 min-w-[180px]">
              <span className="mr-2 text-gray-400">📍</span>
              <input
                type="text"
                placeholder="Destino"
                className="bg-transparent border-none outline-none w-full font-semibold"
                value={destino}
                onChange={e => setDestino(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center bg-gray-50 rounded-lg px-3 py-3 min-w-[180px]">
              <span className="mr-2 text-gray-400">📅</span>
              <input
                type="date"
                className="bg-transparent border-none outline-none"
                value={dataIda}
                onChange={e => setDataIda(e.target.value)}
                required
              />
              <span className="mx-2 text-gray-400">→</span>
              <input
                type="date"
                className="bg-transparent border-none outline-none"
                value={dataVolta}
                onChange={e => setDataVolta(e.target.value)}
                disabled={tipoViagem === 'soIda'}
                required={tipoViagem !== 'soIda'}
              />
            </div>
            <div className="flex items-center bg-gray-50 rounded-lg px-3 py-3 min-w-[180px]">
              <span className="mr-2 text-gray-400">👤</span>
              <input
                type="number"
                min={1}
                max={10}
                className="bg-transparent border-none outline-none w-12 font-semibold"
                value={passageiros}
                onChange={e => setPassageiros(Number(e.target.value))}
                required
              />
              <select
                className="bg-transparent border-none outline-none ml-2 font-semibold"
                value={classe}
                onChange={e => setClasse(e.target.value)}
              >
                <option value="Econômica">Econômica</option>
                <option value="Executiva">Executiva</option>
                <option value="Primeira">Primeira</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="ml-0 md:ml-4 px-10 py-4 bg-[#ffa500] text-white rounded-full font-bold text-lg flex items-center gap-2 hover:bg-[#ffb733] transition-colors shadow-lg"
            disabled={loading}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><circle cx="11" cy="11" r="10"/><path d="M21 21l-4.35-4.35"/></svg>
            Buscar
          </button>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <label className="flex items-center gap-2 text-white font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={dataBarata}
              onChange={e => setDataBarata(e.target.checked)}
              className="form-checkbox h-5 w-5 text-[#ffa500] rounded focus:ring-0 border-gray-300"
            />
            Buscar pela data mais barata
          </label>
        </div>
      </form>
    </div>
  );
};

export default SearchFilterBar; 