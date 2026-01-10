
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Loader2, ArrowLeft, MessageSquare, Shield, HelpCircle, Lightbulb, Trash2 } from 'lucide-react';
import { getCampaignAssistantResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Language, TRANSLATIONS } from '../constants';

interface AIAssistantPageProps {
  onBack: () => void;
  lang: Language;
}

const STORAGE_KEY = 'campaign_ai_chat_history';

const AIAssistantPage: React.FC<AIAssistantPageProps> = ({ onBack, lang }) => {
  const t = TRANSLATIONS[lang];
  
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { 
        role: 'model', 
        text: lang === 'en' 
          ? "Hello! I am the official AI Assistant for Senior Advocate Zainul Abedin. How can I help you today?" 
          : "আসসালামু আলাইকুম! আমি সিনিয়র অ্যাডভোকেট জয়নুল আবেদীনের অফিসিয়াল এআই অ্যাসিস্ট্যান্ট। আমি আপনাকে কীভাবে সাহায্য করতে পারি?"
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    const finalInput = text || input;
    if (!finalInput.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: finalInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await getCampaignAssistantResponse(finalInput, messages, lang);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col flex-1">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl"><ArrowLeft size={24}/></button>
            <h1 className="text-3xl font-bold">{t.nav.ai}</h1>
          </div>
          <button onClick={() => setMessages([])} className="p-2 text-slate-500 hover:text-red-400"><Trash2 size={24}/></button>
        </div>

        <div className="flex-1 bg-white/5 rounded-[3rem] overflow-hidden flex flex-col">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${msg.role === 'user' ? 'bg-red-600' : 'bg-green-700'}`}>
                  {msg.role === 'user' ? <User size={24}/> : <Bot size={24}/>}
                </div>
                <div className={`max-w-[80%] p-5 rounded-3xl ${msg.role === 'user' ? 'bg-red-600' : 'bg-white/10 border border-white/10'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-8 border-t border-white/10">
            <div className="relative">
              <input 
                type="text" value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 px-8 pr-20"
                placeholder={lang === 'en' ? "Ask a question..." : "একটি প্রশ্ন করুন..."}
              />
              <button onClick={() => handleSend()} className="absolute right-3 top-3 bottom-3 w-14 bg-green-700 rounded-2xl flex items-center justify-center">
                <Send size={24}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
