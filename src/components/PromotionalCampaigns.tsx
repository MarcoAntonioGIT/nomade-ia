import React from 'react';

const campaigns = [
  {
    id: 1,
    title: 'Pacotes para Disney',
    image: '/offer-images/imagem-disney.png',
    nights: 6,
    days: 7,
    rating: 9.1,
    stars: 5,
    origin: 'Saindo de São Paulo',
    type: 'Hotel + Ingressos',
    price: 4990,
    oldPrice: 5990,
    offer: true,
    economy: 1000,
    label: 'Oferta Imbatível',
  },
  {
    id: 2,
    title: 'Pacotes para Londres',
    image: '/offer-images/imagem-londres.png',
    nights: 9,
    days: 10,
    rating: 8.7,
    stars: 4,
    origin: 'Saindo do Rio de Janeiro',
    type: 'Hotel + Aéreo',
    price: 6580,
    oldPrice: null,
    offer: false,
    economy: null,
    label: null,
  },
  {
    id: 3,
    title: 'Pacotes para Fernando de Noronha',
    image: '/offer-images/imagem-fernando-de-noronha.png',
    nights: 5,
    days: 6,
    rating: 9.5,
    stars: 5,
    origin: 'Saindo de Recife',
    type: 'Hotel + Passeios',
    price: 3890,
    oldPrice: 4290,
    offer: false,
    economy: 400,
    label: null,
  },
];

const PromotionalCampaigns: React.FC = () => {
  return (
    <section className="w-full py-14 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-blue-900">Ofertas Exlusivas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {campaigns.map((c) => (
            <div key={c.id} className="bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden min-h-[520px]">
              <div className="relative">
                <img src={c.image} alt={c.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 bg-black/90 text-white text-xs font-bold px-3 py-1 rounded-lg">
                  {c.days} DIAS / {c.nights} NOITES
                </div>
                {c.label && (
                  <div className="absolute top-4 right-4 bg-purple-700 text-white text-xs font-bold px-3 py-1 rounded-lg">
                    {c.label}
                  </div>
                )}
                {c.economy && (
                  <div className="absolute bottom-4 left-4 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-lg border border-green-400">
                    Economize R${c.economy}
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col p-6">
                <div className="text-xs text-gray-500 font-bold mb-1">PACOTE</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{c.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded-lg">{c.rating}</span>
                  {Array.from({ length: c.stars }).map((_, i) => (
                    <svg key={i} width="16" height="16" fill="currentColor" className="text-yellow-400 inline-block"><polygon points="8,2 10,6 14,6.5 11,9.5 12,14 8,11.5 4,14 5,9.5 2,6.5 6,6" /></svg>
                  ))}
                </div>
                <div className="text-gray-600 text-sm mb-1">{c.origin}</div>
                <div className="text-gray-600 text-sm mb-4">{c.type}</div>
                <div className="mt-auto">
                  <div className="text-xs text-gray-500 mb-1">Preço por pessoa</div>
                  {c.oldPrice && (
                    <div className="text-sm text-gray-400 line-through">R$ {c.oldPrice.toLocaleString('pt-BR')}</div>
                  )}
                  <div className="text-2xl font-bold text-gray-900 mb-1">R$ {c.price.toLocaleString('pt-BR')}</div>
                  <div className="text-xs text-gray-400 mb-4">Taxas e impostos não inclusos</div>
                  <a href="#" className="block w-full text-center px-6 py-3 bg-[#0070e0] text-white rounded-full font-semibold text-lg hover:bg-blue-800 transition-colors shadow">Saiba mais</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalCampaigns; 