
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulação de envio do email
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Mensagem enviada!",
        description: "Recebemos sua mensagem e entraremos em contato em breve.",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro ao enviar sua mensagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold font-heading text-center mb-8">
              Entre em Contato
            </h1>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Estamos aqui para ajudar você a planejar a viagem dos seus sonhos
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Informações de Contato */}
              <div className="space-y-8">
                <h2 className="text-2xl font-bold font-heading mb-6 text-nomade-turquoise">
                  Fale Conosco
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-6 bg-nomade-light-turquoise rounded-lg">
                    <Mail className="h-8 w-8 text-nomade-turquoise" />
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-muted-foreground">contato@nomadeia.com</p>
                      <p className="text-sm text-muted-foreground">Respondemos em até 24 horas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-6 bg-nomade-light-orange rounded-lg">
                    <MessageCircle className="h-8 w-8 text-nomade-orange" />
                    <div>
                      <h3 className="font-semibold text-lg">WhatsApp</h3>
                      <p className="text-muted-foreground">+55 (11) 99999-9999</p>
                      <p className="text-sm text-muted-foreground">Atendimento de segunda a sexta, 9h às 18h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-6 bg-muted rounded-lg">
                    <Phone className="h-8 w-8 text-nomade-dark-blue" />
                    <div>
                      <h3 className="font-semibold text-lg">Telefone</h3>
                      <p className="text-muted-foreground">+55 (11) 3000-0000</p>
                      <p className="text-sm text-muted-foreground">Suporte técnico e vendas</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-nomade-dark-blue text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Horário de Atendimento</h3>
                  <div className="space-y-1 text-sm">
                    <p>Segunda a Sexta: 9h às 18h</p>
                    <p>Sábados: 9h às 14h</p>
                    <p>Domingos e Feriados: Fechado</p>
                  </div>
                </div>
              </div>
              
              {/* Formulário de Contato */}
              <div>
                <div className="bg-white p-8 rounded-lg shadow-sm border">
                  <h2 className="text-2xl font-bold font-heading mb-6 text-nomade-turquoise">
                    Envie uma Mensagem
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="seu@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Assunto</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Sobre o que você gostaria de falar?"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Descreva sua dúvida, sugestão ou como podemos ajudar..."
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-nomade-orange hover:bg-nomade-orange/90 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                    </Button>
                  </form>
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

export default ContactPage;
