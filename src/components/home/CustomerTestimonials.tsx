
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const testimonials = [
  {
    id: 1,
    name: 'Maria Silva',
    location: 'São Paulo, SP',
    rating: 5,
    comment: 'A IA da Nomade criou um roteiro incrível para minha lua de mel em Paris. Cada detalhe foi pensado perfeitamente!',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e75b15?w=150&h=150&fit=crop&crop=face',
    trip: 'Paris, França'
  },
  {
    id: 2,
    name: 'João Santos',
    location: 'Rio de Janeiro, RJ',
    rating: 5,
    comment: 'Economizei mais de R$800 na minha viagem para Londres. O sistema encontrou ofertas que eu nunca imaginei existir!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    trip: 'Londres, Inglaterra'
  },
  {
    id: 3,
    name: 'Ana Costa',
    location: 'Belo Horizonte, MG',
    rating: 5,
    comment: 'Viajei para Fernando de Noronha com minha família. O roteiro foi perfeito para todos, desde as crianças até os avós!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    trip: 'Fernando de Noronha, PE'
  },
  {
    id: 4,
    name: 'Carlos Oliveira',
    location: 'Porto Alegre, RS',
    rating: 5,
    comment: 'A inteligência artificial entendeu exatamente meu estilo de viagem aventureiro. Experiência incrível no Chile!',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    trip: 'Santiago, Chile'
  }
];

const CustomerTestimonials: React.FC = () => {
  return (
    <section className="py-16 bg-nomade-navy">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Mais de 10.000 viajantes já confiaram na nossa IA para criar experiências únicas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="w-12 h-12 mr-3">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-nomade-navy">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="w-8 h-8 text-nomade-turquoise/20 absolute -top-2 -left-1" />
                  <p className="text-gray-700 text-sm leading-relaxed pl-6 mb-3">
                    {testimonial.comment}
                  </p>
                </div>

                <div className="border-t pt-3">
                  <p className="text-xs text-nomade-turquoise font-medium">
                    Viagem: {testimonial.trip}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 3).map((testimonial, i) => (
                <Avatar key={i} className="w-8 h-8 border-2 border-white">
                  <AvatarImage src={testimonial.avatar} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="text-white">
              <p className="font-semibold">+10.000 viajantes satisfeitos</p>
              <div className="flex items-center gap-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
