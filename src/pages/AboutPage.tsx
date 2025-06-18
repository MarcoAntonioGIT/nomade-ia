
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold font-heading text-center mb-8">
              Sobre Nós
            </h1>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <p className="text-lg text-muted-foreground text-center mb-12">
                Na Nomade IA, acreditamos que toda viagem pode ser transformadora – e que cada viajante merece uma experiência feita sob medida, única como você. Por isso, unimos tecnologia de ponta com a paixão por descobrir o mundo para criar uma nova forma de planejar viagens: com inteligência artificial.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-bold font-heading mb-4 text-nomade-turquoise">
                    Nossa Missão
                  </h2>
                  <p className="text-muted-foreground">
                    Nossa missão é simplificar o planejamento e potencializar cada experiência de viagem. Usando algoritmos avançados e um amplo banco de dados atualizado, nossa IA entende suas preferências, necessidades e orçamento, criando roteiros completos que se encaixam perfeitamente ao seu estilo.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold font-heading mb-4 text-nomade-turquoise">
                    Como Funciona
                  </h2>
                  <p className="text-muted-foreground">
                    Você nos diz de onde parte, para onde quer ir e quais são seus interesses – e nosso sistema inteligente cuida do resto. Em minutos, você recebe um roteiro personalizado, com sugestões de passeios, restaurantes, hospedagem, dicas de economia e até previsão do tempo. Tudo para que sua única preocupação seja aproveitar ao máximo cada momento.
                  </p>
                </div>
              </div>
              
              <div className="bg-nomade-light-turquoise p-8 rounded-lg">
                <h2 className="text-2xl font-bold font-heading mb-6 text-nomade-dark-blue text-center">
                  Por Que Escolher a Nomade IA?
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2 text-nomade-turquoise">Personalização Total</h3>
                    <p className="text-muted-foreground">Cada roteiro é único, criado sob medida para você.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2 text-nomade-turquoise">Agilidade</h3>
                    <p className="text-muted-foreground">Planeje sua viagem em minutos, sem complicação.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2 text-nomade-turquoise">Atualização em Tempo Real</h3>
                    <p className="text-muted-foreground">Nossos dados são constantemente atualizados para garantir as melhores recomendações.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2 text-nomade-turquoise">Suporte Humano</h3>
                    <p className="text-muted-foreground">Nossa equipe está sempre pronta para ajudar, seja para ajustes finos ou aquele toque especial.</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h2 className="text-2xl font-bold font-heading mb-4 text-nomade-turquoise">
                  Nosso Compromisso
                </h2>
                <p className="text-muted-foreground mb-6">
                  Queremos democratizar viagens incríveis. Seja para um mochilão solo, uma lua de mel dos sonhos ou férias em família, estamos aqui para transformar seu desejo de viajar em realidade – com tecnologia, carinho e criatividade.
                </p>
                
                <div className="bg-nomade-dark-blue text-white p-8 rounded-lg">
                  <p className="text-lg font-semibold mb-2">
                    Descubra como a inteligência artificial pode levar você ainda mais longe.
                  </p>
                  <p className="text-xl font-bold">
                    Bem-vindo(a) à nova era do turismo. Bem-vindo(a) à Nomade IA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
