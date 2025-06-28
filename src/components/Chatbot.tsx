import React, { useRef, useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isStarted, setIsStarted] = useState(false);

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    
    // Se é a primeira mensagem, inicialize com a mensagem de boas-vindas
    if (!isStarted) {
      setMessages([
        { sender: 'bot', text: 'Olá! Sou a NOMA, sua assistente de viagens. Como posso ajudar?' },
        { sender: 'user', text: userMsg }
      ]);
      setIsStarted(true);
    } else {
      setMessages((msgs) => [...msgs, { sender: 'user', text: userMsg }]);
    }
    
    setInput('');
    setLoading(true);
    
    try {
      const res = await fetch('https://n8n.nomadeia.com.br/webhook-test/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { sender: 'bot', text: data.reply || 'Desculpe, não entendi. Pode tentar novamente?' }]);
    } catch {
      setMessages((msgs) => [...msgs, { sender: 'bot', text: 'Erro ao conectar. Tente novamente.' }]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Onde devemos começar?
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Nossa IA está pronta para ajudar você a planejar a viagem dos seus sonhos. 
          Conte-nos seus destinos desejados, orçamento, datas ou qualquer preferência especial.
        </p>
      </div>
      
      {/* Área de mensagens - só aparece se houver mensagens */}
      {messages.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
          <div className="max-h-96 overflow-y-auto px-6 py-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-base ${
                  msg.sender === 'user' 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'bg-blue-50 text-gray-800 border border-blue-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-blue-50 border border-blue-100 px-4 py-3 rounded-2xl text-base text-gray-800">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
      
      {/* Formulário de entrada - sempre mantém o design moderno */}
      <form onSubmit={sendMessage} className="max-w-3xl mx-auto">
        <div className="relative bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center px-6 py-4">
            <input
              type="text"
              className="flex-1 px-4 py-2 text-lg text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none"
              placeholder="Pergunte qualquer coisa"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              autoFocus
            />
            
            <button
              type="submit"
              className="bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full p-3 transition-colors disabled:opacity-50 flex items-center justify-center ml-4 w-10 h-10"
              disabled={loading || !input.trim()}
              aria-label="Enviar"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
