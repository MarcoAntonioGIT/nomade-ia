
import React, { useState } from 'react';
import { Mail, Gift, Bell, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simular inscrição
    setSubscribed(true);
    toast("🎉 Parabéns! Você está inscrito para receber ofertas exclusivas!");
    
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  if (subscribed) {
    return (
      <section className="py-16 bg-gradient-to-br from-nomade-navy via-indigo-800 to-emerald-600">
        <div className="container">
          <Card className="max-w-2xl mx-auto border-0 shadow-2xl">
            <CardContent className="text-center p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-nomade-navy mb-4">
                🎉 Bem-vindo ao clube VIP!
              </h3>
              <p className="text-gray-600 mb-6">
                Você receberá ofertas exclusivas com até 40% de desconto em primeira mão!
              </p>
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
                <p className="text-yellow-800 font-semibold">
                  🎁 Bônus: Desconto de R$50 na sua primeira compra já foi aplicado à sua conta!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-nomade-navy via-indigo-800 to-nomade-turquoise">
      <div className="container">
        <Card className="max-w-4xl mx-auto border-0 shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-nomade-orange to-red-500 p-8 text-white">
              <div className="h-full flex flex-col justify-center">
                <div className="mb-6">
                  <Mail className="w-16 h-16 text-yellow-200 mb-4" />
                  <h2 className="text-3xl font-bold mb-4">
                    💌 Ofertas Secretas VIP
                  </h2>
                  <p className="text-yellow-100 text-lg mb-6">
                    Cadastre-se e receba ofertas exclusivas com até 40% de desconto
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Gift className="w-5 h-5 text-yellow-300" />
                    <span className="text-yellow-100">Ofertas antes de todo mundo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-yellow-300" />
                    <span className="text-yellow-100">Alertas de promoções relâmpago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-yellow-300" />
                    <span className="text-yellow-100">Dicas exclusivas da nossa IA</span>
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-8 bg-white">
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-nomade-navy mb-4">
                  Junte-se a +50.000 viajantes espertos
                </h3>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-yellow-800 font-semibold text-sm">
                    🎁 BÔNUS: Ganhe R$50 de desconto na primeira compra!
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Seu melhor e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-lg"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-nomade-orange hover:bg-nomade-orange/90 text-white font-bold text-lg"
                  >
                    🚀 Quero as Ofertas Secretas
                  </Button>
                </form>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Sem spam. Cancele quando quiser. Seus dados estão seguros.
                </p>

                <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600">
                  <span>Já confiam em nós:</span>
                  <div className="flex -space-x-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="font-semibold">+50k pessoas</span>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSection;
