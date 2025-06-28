
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';

const AboutPage = () => {
  return (
    <PageLayout>
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold font-heading text-center mb-8">
            Sobre Nós
          </h1>
          
          <p className="text-lg text-muted-foreground text-center mb-12">
            Na Nomade IA, acreditamos que toda viagem pode ser transformadora – e que cada viajante merece uma experiência feita sob medida, única como você.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold font-heading mb-4 text-nomade-turquoise">
                Nossa Missão
              </h2>
              <p className="text-muted-foreground">
                Simplificar o planejamento e potencializar cada experiência de viagem usando algoritmos avançados e um amplo banco de dados atualizado.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold font-heading mb-4 text-nomade-turquoise">
                Como Funciona
              </h2>
              <p className="text-muted-foreground">
                Você nos diz de onde parte, para onde quer ir e quais são seus interesses – e nosso sistema inteligente cuida do resto.
              </p>
            </div>
          </div>
          
          <div className="bg-nomade-light-turquoise p-8 rounded-lg mb-12">
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
                <p className="text-muted-foreground">Dados constantemente atualizados para as melhores recomendações.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-nomade-turquoise">Suporte Humano</h3>
                <p className="text-muted-foreground">Nossa equipe sempre pronta para ajudar.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
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
    </PageLayout>
  );
};

export default AboutPage;
