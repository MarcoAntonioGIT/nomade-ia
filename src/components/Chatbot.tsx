import React, { useRef, useState } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Olá! Sou a Layla, sua assistente de viagens. Como posso ajudar?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((msgs) => [...msgs, { sender: 'user', text: userMsg }]);
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
    <div className="w-full rounded-2xl flex flex-col min-h-[420px] bg-[#18181a] text-white">
      <div className="flex flex-col items-center px-6 pt-10 pb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Monte sua viagem personalizada com<br />inteligência artificial</h2>
        <p className="text-base md:text-lg text-gray-300 text-center max-w-2xl">Combinamos tecnologia avançada com conhecimento profundo de turismo para criar o roteiro perfeito para você.</p>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4" style={{ minHeight: 240 }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-base ${msg.sender === 'user' ? 'bg-[#343541] text-white rounded-br-sm' : 'bg-[#232324] text-gray-100 rounded-bl-sm'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex items-center gap-2 px-6 py-8 border-t border-[#232324] bg-[#18181a]">
        <input
          type="text"
          className="flex-1 px-5 py-4 rounded-full border border-[#232324] bg-[#232324] text-white focus:ring-2 focus:ring-[#0070e0] focus:outline-none text-lg placeholder-gray-400"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
          autoFocus
        />
        <button
          type="submit"
          className="bg-[#0070e0] text-white rounded-full p-4 hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center justify-center"
          disabled={loading || !input.trim()}
          aria-label="Enviar"
        >
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </form>
    </div>
  );
};

export default Chatbot; 