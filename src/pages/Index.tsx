
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <video 
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay 
            muted 
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          >
            <source src="https://static.videezy.com/system/resources/previews/000/041/248/original/01.mp4" type="video/mp4" />
          </video>
          
          <div className="container relative z-20 fade-in">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                Monte sua viagem personalizada com inteligência artificial
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Combinamos tecnologia avançada com conhecimento profundo de turismo para criar o roteiro perfeito para você.
              </p>
              <Link to="/planner">
                <Button size="lg" className="bg-nomade-orange hover:bg-nomade-orange/90 text-white font-semibold px-8 py-6 text-xl">
                  Planeje sua viagem
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">
              Como funciona
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="bg-nomade-light-turquoise text-nomade-turquoise w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
                <h3 className="text-xl font-semibold mb-4">Preencha suas preferências</h3>
                <p className="text-muted-foreground">
                  Informe seu destino, datas, orçamento e preferências para que nossa IA entenda o que você busca.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="bg-nomade-light-turquoise text-nomade-turquoise w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
                <h3 className="text-xl font-semibold mb-4">Receba seu roteiro personalizado</h3>
                <p className="text-muted-foreground">
                  Nossa IA cria um roteiro detalhado com atrações, restaurantes e dicas locais adaptadas ao seu perfil.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="bg-nomade-light-turquoise text-nomade-turquoise w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
                <h3 className="text-xl font-semibold mb-4">Viaje com tranquilidade</h3>
                <p className="text-muted-foreground">
                  Reserve tudo em um só lugar e aproveite sua viagem com acesso ao seu itinerário pelo aplicativo.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/planner">
                <Button className="bg-nomade-dark-blue hover:bg-nomade-dark-blue/90 text-white">
                  Comece agora
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Destinations Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">
              Destinos populares
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Inspirações para sua próxima aventura
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: 'Rio de Janeiro',
                  image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                },
                {
                  name: 'Fernando de Noronha',
                  image: 'https://images.unsplash.com/photo-1570133103227-96cd667b2b71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                },
                {
                  name: 'Gramado',
                  image: 'https://images.unsplash.com/photo-1518139289178-863fe67d5337?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                },
                {
                  name: 'Lençóis Maranhenses',
                  image: 'https://images.unsplash.com/photo-1604999286549-9775ca576cd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                },
              ].map((destination) => (
                <div key={destination.name} className="group relative rounded-lg overflow-hidden cursor-pointer">
                  <div className="aspect-[4/3]">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <h3 className="text-white text-xl font-semibold">{destination.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">
              O que nossos clientes dizem
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Rodrigo Silva',
                  text: 'A viagem personalizada pela IA foi incrível! Cada detalhe foi pensado e não precisei me preocupar com nada. Recomendo demais!',
                  location: 'Viagem para Gramado',
                },
                {
                  name: 'Marina Costa',
                  text: 'Economizei tempo e dinheiro usando a Nomade IA. O roteiro foi perfeito e incluiu lugares que eu jamais descobriria sozinha.',
                  location: 'Viagem para Lisboa',
                },
                {
                  name: 'Carlos Mendes',
                  text: 'Como viajante de negócios, preciso de praticidade. A Nomade IA me surpreendeu com sua eficiência e personalização.',
                  location: 'Viagem para Nova York',
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-nomade-light-turquoise flex items-center justify-center text-nomade-turquoise font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-nomade-dark-blue">
          <div className="container text-center">
            <h2 className="text-3xl font-bold font-heading text-white mb-6">
              Pronto para planejar sua próxima aventura?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Deixe nossa inteligência artificial criar um roteiro personalizado que atenda às suas preferências e orçamento.
            </p>
            <Link to="/planner">
              <Button size="lg" className="bg-nomade-orange hover:bg-nomade-orange/90 text-white">
                Planeje sua viagem agora
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
