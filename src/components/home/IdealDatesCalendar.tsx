
import React, { useState } from 'react';
import { Calendar, TrendingDown, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const monthsData = [
  { month: 'Jan', discount: 15, label: 'Baixa temporada', color: 'bg-green-500' },
  { month: 'Fev', discount: 20, label: 'Melhor época', color: 'bg-emerald-500' },
  { month: 'Mar', discount: 25, label: 'Super desconto', color: 'bg-emerald-600' },
  { month: 'Abr', discount: 10, label: 'Boa época', color: 'bg-yellow-500' },
  { month: 'Mai', discount: 5, label: 'Temporada média', color: 'bg-orange-500' },
  { month: 'Jun', discount: 0, label: 'Alta temporada', color: 'bg-red-500' },
  { month: 'Jul', discount: 0, label: 'Alta temporada', color: 'bg-red-500' },
  { month: 'Ago', discount: 5, label: 'Temporada média', color: 'bg-orange-500' },
  { month: 'Set', discount: 15, label: 'Baixa temporada', color: 'bg-green-500' },
  { month: 'Out', discount: 20, label: 'Melhor época', color: 'bg-emerald-500' },
  { month: 'Nov', discount: 25, label: 'Super desconto', color: 'bg-emerald-600' },
  { month: 'Dez', discount: 0, label: 'Alta temporada', color: 'bg-red-500' },
];

const IdealDatesCalendar: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-nomade-navy mb-4">
            📅 Calendário de Ofertas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra os melhores meses para viajar e economizar até 25% na sua próxima aventura
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-nomade-navy to-nomade-turquoise text-white">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calendar className="w-6 h-6" />
              Melhores datas para viajar em 2024
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {monthsData.map((monthData) => (
                <div
                  key={monthData.month}
                  className={`relative p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedMonth === monthData.month ? 'ring-2 ring-nomade-orange' : ''
                  }`}
                  onClick={() => setSelectedMonth(monthData.month)}
                >
                  <div className={`${monthData.color} text-white p-3 rounded-lg text-center shadow-lg`}>
                    <p className="font-bold text-lg">{monthData.month}</p>
                    {monthData.discount > 0 && (
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <TrendingDown className="w-4 h-4" />
                        <span className="text-sm font-semibold">{monthData.discount}%</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-center mt-2 font-medium text-gray-700">
                    {monthData.label}
                  </p>
                  
                  {monthData.discount >= 20 && (
                    <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-yellow-900 text-xs">
                      🔥 TOP
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            {selectedMonth && (
              <div className="bg-gradient-to-r from-nomade-turquoise/10 to-nomade-orange/10 rounded-lg p-6 border border-nomade-turquoise/20">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-nomade-turquoise mt-1" />
                  <div>
                    <h4 className="font-semibold text-nomade-navy mb-2">
                      Informações para {selectedMonth}
                    </h4>
                    <p className="text-gray-700 mb-3">
                      {monthsData.find(m => m.month === selectedMonth)?.discount! > 0 
                        ? `Economize até ${monthsData.find(m => m.month === selectedMonth)?.discount}% nas suas viagens neste mês!`
                        : 'Mês de alta temporada - reserve com antecedência para melhores preços.'
                      }
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        {monthsData.find(m => m.month === selectedMonth)?.label}
                      </Badge>
                      <Badge className="bg-nomade-orange text-white">
                        IA Recomenda
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center mt-8">
              <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                Preços baseados em análise de IA com dados históricos de viagens
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default IdealDatesCalendar;
