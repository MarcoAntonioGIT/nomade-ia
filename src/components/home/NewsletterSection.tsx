
import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';
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
    toast("✅ Inscrito com sucesso! Você receberá nossas ofertas exclusivas.");
    
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  if (subscribed) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container max-w-md mx-auto">
          <div className="text-center p-8 bg-white rounded-lg border">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tudo certo!
            </h3>
            <p className="text-gray-600">
              Você receberá nossas ofertas exclusivas em breve.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container max-w-md mx-auto">
        <div className="text-center p-8 bg-white rounded-lg border">
          <Mail className="w-12 h-12 text-nomade-orange mx-auto mb-4" />
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Ofertas Exclusivas
          </h2>
          
          <p className="text-gray-600 mb-6">
            Receba as melhores promoções de viagem diretamente no seu email
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-center"
              required
            />
            <Button
              type="submit"
              className="w-full bg-nomade-orange hover:bg-nomade-orange/90"
            >
              Quero receber ofertas
            </Button>
          </form>

          <p className="text-xs text-gray-500 mt-4">
            Sem spam. Cancele quando quiser.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
