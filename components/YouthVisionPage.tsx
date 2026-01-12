
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Rocket, Cpu, Trophy, Zap, Laptop, Lightbulb, ArrowRight, MessageCircle } from 'lucide-react';
import { Language, TRANSLATIONS, CANDIDATE_NAME, CANDIDATE_NAME_BN } from '../constants';
import { getData } from '../services/storageService';

interface YouthVisionPageProps {
  onBack: () => void;
  onFeedback: () => void;
  lang: Language;
}

const YouthVisionPage: React.FC<YouthVisionPageProps> = ({ onBack, onFeedback, lang }) => {
  const t = TRANSLATIONS[lang];
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const data = getData('YOUTH');
    if (data) setContent(data[lang]);
  }, [lang]);

  if (!content) return null;

  const icons = [<Laptop className="text-blue-500" size={32} />, <Trophy className="text-yellow-500" size={32} />, <Rocket className="text-purple-500" size={32} />, <Cpu className="text-green-500" size={32} />];
  const colors = ["from-blue-500/10 to-blue-600/5", "from-yellow-500/10 to-yellow-600/5", "from-purple-500/10 to-purple-600/5", "from-green-500/10 to-green-600/5"];

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-semibold mb-8 hover:text-green-700 transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          {t.nav.back}
        </button>

        <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 p-8 md:p-20 text-white mb-16 shadow-2xl">
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-700/30 border border-green-500/30 text-green-400 text-sm font-black mb-8 animate-bounce-slow"><Zap size={18} /> {lang === 'en' ? 'VISION 2026' : 'ভিশন ২০২৬'}</div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight font-serif italic">{lang === 'en' ? 'Youth Vision' : 'তারুণ্যের ভাবনা'}</h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium mb-10 max-w-2xl">{content.subtitle}</p>
            <button onClick={onFeedback} className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-50 transition-all flex items-center gap-3">
               {lang === 'en' ? 'Share Your Ideas' : 'আপনার আইডিয়া দিন'} <Lightbulb size={24} className="text-yellow-500" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {content.cards.map((c: any, i: number) => (
            <div key={i} className={`group relative bg-gradient-to-br ${colors[i]} rounded-[2.5rem] p-10 border border-slate-100 hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
              <div className="relative z-10">
                <div className="bg-white p-5 rounded-2xl shadow-xl mb-8 inline-block group-hover:rotate-6 transition-transform">{icons[i]}</div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6 font-serif">{c.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-700 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl text-center">
           <h2 className="text-4xl md:text-5xl font-bold font-serif italic mb-8">
             {lang === 'en' ? '"You are the architects of Barisal-3."' : '"তোমরা বরিশাল-৩ এর আগামীর রূপকার।"'}
           </h2>
           <div className="font-bold text-xl">{lang === 'en' ? CANDIDATE_NAME : CANDIDATE_NAME_BN}</div>
        </div>

        <div className="mt-20 text-center">
           <button onClick={onFeedback} className="inline-flex items-center gap-4 bg-slate-900 text-white px-12 py-6 rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-slate-800 hover:-translate-y-1 transition-all group">
              {lang === 'en' ? 'Join the Digital Revolution' : 'ডিজিটাল বিপ্লবে যোগ দাও'} <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default YouthVisionPage;
