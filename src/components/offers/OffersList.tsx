
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

type Offer = {
  id: number;
  title: string;
  description: string;
  price: number;
  discount?: number;
  imageUrl: string;
  type: 'insurance' | 'tour' | 'transfer' | 'experience';
};

const offers: Offer[] = [
  {
    id: 1,
    title: 'Seguro Viagem Premium',
    description: 'Cobertura completa para sua viagem com assistência 24h, despesas médicas, extravio de bagagem e mais.',
    price: 350,
    discount: 15,
    imageUrl: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    type: 'insurance',
  },
  {
    id: 2,
    title: 'City Tour Personalizado',
    description: 'Passeio guiado pelos principais pontos turísticos da cidade com guia especializado e transporte privativo.',
    price: 280,
    imageUrl: 'https://images.unsplash.com/photo-1564689510742-4e9c7584181d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    type: 'tour',
  },
  {
    id: 3,
    title: 'Transfer Aeroporto-Hotel',
    description: 'Transporte privativo entre o aeroporto e seu hotel com motorista profissional e veículo confortável.',
    price: 150,
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    type: 'transfer',
  },
  {
    id: 4,
    title: 'Experiência Gastronômica',
    description: 'Tour guiado pelos melhores restaurantes locais com degustação de pratos típicos e bebidas selecionadas.',
    price: 420,
    discount: 10,
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    type: 'experience',
  },
  {
    id: 5,
    title: 'Passeio de Helicóptero',
    description: 'Vista panorâmica incrível da cidade em um tour de 30 minutos de helicóptero.',
    price: 950,
    imageUrl: 'https://images.unsplash.com/photo-1534331981361-375a0d34f5b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    type: 'experience',
  },
  {
    id: 6,
    title: 'Seguro Cancelamento',
    description: 'Reembolso em caso de cancelamento de viagem por motivos de saúde, trabalho ou imprevistos.',
    price: 200,
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    type: 'insurance',
  },
];

const OffersList = () => {
  const { toast } = useToast();

  const handleAddToCart = (offer: Offer) => {
    toast({
      title: "Item adicionado",
      description: `${offer.title} foi adicionado ao carrinho.`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {offers.map((offer) => (
        <Card key={offer.id} className="overflow-hidden">
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={offer.imageUrl} 
              alt={offer.title} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{offer.title}</CardTitle>
                <CardDescription>{offer.description}</CardDescription>
              </div>
              {offer.discount && (
                <span className="bg-travel-orange text-white text-xs font-semibold px-2 py-1 rounded-full">
                  -{offer.discount}%
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end">
              {offer.discount ? (
                <>
                  <span className="text-muted-foreground line-through text-sm mr-2">
                    R$ {offer.price.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-travel-blue text-xl font-bold">
                    R$ {Math.round(offer.price * (1 - offer.discount / 100)).toLocaleString('pt-BR')}
                  </span>
                </>
              ) : (
                <span className="text-travel-blue text-xl font-bold">
                  R$ {offer.price.toLocaleString('pt-BR')}
                </span>
              )}
              <span className="text-muted-foreground text-sm ml-1">/ pessoa</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => handleAddToCart(offer)}
              className="w-full bg-travel-blue hover:bg-travel-blue/90"
            >
              Adicionar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default OffersList;
