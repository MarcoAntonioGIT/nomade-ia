
import React from 'react';
import { Plane, Package, Bed, Car, Shield, Building, MapPin, Bus, Heart, Globe, Gift } from 'lucide-react';

const CategoryNavbar = () => {
  const categories = [
    { icon: Plane, label: 'Passagens', active: true },
    { icon: Package, label: 'Pacotes' },
    { icon: Bed, label: 'Hospedagens' },
    { icon: Car, label: 'Carros' },
    { icon: Shield, label: 'Seguros' },
    { icon: Building, label: 'Aluguéis' },
    { icon: MapPin, label: 'Passeios' },
    { icon: Bus, label: 'Transfers' },
    { icon: Heart, label: 'Disney' },
    { icon: Globe, label: 'Universal' },
    { icon: Gift, label: 'Ofertas' },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container">
        <div className="flex items-center justify-between py-3 overflow-x-auto">
          <div className="flex space-x-8 min-w-max">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors min-w-[70px] ${
                  category.active 
                    ? 'text-nomade-orange bg-nomade-light-orange' 
                    : 'text-gray-600 hover:text-nomade-orange hover:bg-gray-50'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNavbar;
