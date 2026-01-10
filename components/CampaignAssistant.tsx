
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Loader2 } from 'lucide-react';
import { getCampaignAssistantResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const CampaignAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome! I am the official AI Assistant for Advocate Zainul Abedin. How can I help you learn about our vision for Barisal-3 today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await getCampaignAssistantResponse(input, messages);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <section id="ai-assistant" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/20 rounded-full blur-[120px]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-950/50 border border-green-500/30 text-green-400 text-sm font-semibold mb-4">
            <Sparkles size={16} />
            AI Campaign Helper
          </div>
          <h2 className="text-4xl font-bold mb-4">Ask the Campaign</h2>
          <p className="text-slate-400">Interact with our AI to learn about policies, background, and local plans.</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-xl rounded-3xl shadow-2xl h-[500px] flex flex-col overflow-hidden">
          {/* Chat area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-600"
          >
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-red-600' : 'bg-green-700'
                }`}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-red-600 text-white rounded-tr-none' 
                    : 'bg-slate-700 text-slate-100 rounded-tl-none border border-slate-600'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div className="bg-slate-700 p-4 rounded-2xl rounded-tl-none border border-slate-600">
                  <Loader2 size={20} className="animate-spin text-green-400" />
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="p-4 bg-slate-900/50 border-t border-slate-700">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about education, river erosion, or legal career..."
                className="w-full bg-slate-800 border border-slate-600 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-white placeholder:text-slate-500"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-2 bottom-2 w-12 bg-green-700 hover:bg-green-600 disabled:bg-slate-600 rounded-xl flex items-center justify-center transition-all shadow-lg"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignAssistant;
