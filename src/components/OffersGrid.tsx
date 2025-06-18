
import React from 'react';
import { Button } from '@/components/ui/button';

interface Offer {
  id: number;
  title: string;
  subtitle?: string;
  price: string;
  originalPrice?: string;
  image: string;
  tag?: string;
  discount?: string;
  buttonText: string;
  color: string;
}

interface OffersGridProps {
  title: string;
  subtitle?: string;
  offers: Offer[];
}

const OffersGrid = ({ title, subtitle, offers }: OffersGridProps) => {
  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: offer.color }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                {offer.tag && (
                  <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {offer.tag}
                  </div>
                )}
                {offer.discount && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-lg font-bold">
                    {offer.discount}
                  </div>
                )}
              </div>
              
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                {offer.subtitle && (
                  <p className="text-white/80 text-sm mb-4">{offer.subtitle}</p>
                )}
                
                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="text-2xl font-bold">{offer.price}</span>
                  {offer.originalPrice && (
                    <span className="text-white/60 line-through text-sm">{offer.originalPrice}</span>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  {offer.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersGrid;
