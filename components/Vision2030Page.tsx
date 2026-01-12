
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Flag, ShieldCheck, Globe, Handshake, Target, CheckCircle2, ChevronRight } from 'lucide-react';
import { Language, TRANSLATIONS, CANDIDATE_NAME, CANDIDATE_NAME_BN } from '../constants';
import { getData } from '../services/storageService';

interface Vision2030PageProps {
  onBack: () => void;
  lang: Language;
}

const Vision2030Page: React.FC<Vision2030PageProps> = ({ onBack, lang }) => {
  const t = TRANSLATIONS[lang];
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const data = getData('VISION2030');
    if (data) setContent(data[lang]);
  }, [lang]);

  if (!content) return null;

  const icons = [<ShieldCheck className="text-green-700" size={40} />, <Target className="text-green-700" size={40} />, <Handshake className="text-green-700" size={40} />, <Globe className="text-green-700" size={40} />];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-semibold mb-8 hover:text-green-700 transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          {t.nav.back}
        </button>

        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-20 text-white shadow-2xl mb-16 relative overflow-hidden">
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-600/30 border border-red-500/30 text-red-400 text-sm font-black mb-8"><Flag size={18} /> {lang === 'en' ? 'NATIONAL COMMITMENT' : 'জাতীয় অঙ্গীকার'}</div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight font-serif italic">{lang === 'en' ? 'Vision 2030' : 'ভিশন ২০৩০'}</h1>
            <p className="text-xl md:text-3xl text-slate-300 leading-relaxed font-medium mb-12">{content.subtitle}</p>
            <div className="w-24 h-2 bg-green-600 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {content.pillars.map((p: any, i: number) => (
            <div key={i} className="bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center group">
              <div className="bg-slate-50 p-6 rounded-3xl mb-8 group-hover:scale-110 transition-transform duration-500">{icons[i]}</div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6 font-serif">{p.title}</h3>
              <p className="text-lg text-slate-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] p-10 md:p-20 shadow-sm border border-slate-100 mb-20 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-2 h-full bg-green-700"></div>
           <p className="text-2xl text-slate-700 leading-relaxed italic">{content.intro}</p>
        </div>

        <div className="bg-green-700 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl text-center">
           <p className="text-2xl md:text-4xl italic font-medium leading-relaxed max-w-5xl mx-auto mb-12">
             {lang === 'en' ? '"Vision 2030 is our sacred map for a prosperous motherland."' : '"ভিশন ২০৩০ কেবল একটি দলিল নয়; এটি সমৃদ্ধ মাতৃভূমির জন্য পবিত্র মানচিত্র।"'}
           </p>
           <div className="inline-flex items-center gap-4">
             <div className="font-bold text-2xl">{lang === 'en' ? CANDIDATE_NAME : CANDIDATE_NAME_BN}</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Vision2030Page;
