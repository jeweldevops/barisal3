
import React from 'react';
import { ArrowRight, CheckCircle, Award, Landmark, Gavel, ShieldCheck } from 'lucide-react';
import { CANDIDATE_IMAGE, TRANSLATIONS, Language } from '../constants';
import { getData } from '../services/storageService';

interface HeroProps {
  onNavigate?: (page: 'home' | 'vision' | 'biography' | 'updates' | 'ai-assistant' | 'support-us') => void;
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ onNavigate, lang }) => {
  const t = TRANSLATIONS[lang];
  const profile = getData('PROFILE');

  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-10 skew-x-[-12deg] translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-50 text-green-800 text-sm font-bold mb-8 shadow-sm border border-green-100">
              <ShieldCheck size={18} className="text-green-600" />
              {t.hero.nominee}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] text-slate-900 mb-6 font-serif tracking-tight">
              {lang === 'en' ? 'Advocate ' : ''}<span className="text-red-600">{lang === 'en' ? profile.name_en.replace('Advocate ', '') : profile.name_bn.replace('এ্যাডভোকেট ', '')}</span>
            </h1>
            
            <p className="text-green-800 font-black text-xl md:text-2xl mb-10 leading-snug max-w-2xl mx-auto lg:mx-0">
              {lang === 'en' ? profile.nominee_full_en : profile.nominee_full_bn}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12 max-w-2xl mx-auto lg:mx-0">
              <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-start gap-5 hover:bg-white hover:shadow-md transition-all duration-300">
                <div className="bg-red-100 p-4 rounded-2xl text-red-600"><Award size={24} /></div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{lang === 'en' ? 'BNP Leadership' : 'বিএনপি নেতৃত্ব'}</h4>
                  <p className="text-slate-600 text-xs font-semibold leading-relaxed mt-1 whitespace-pre-line">
                    {lang === 'en' ? profile.role1_en : profile.role1_bn}
                  </p>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-start gap-5 hover:bg-white hover:shadow-md transition-all duration-300">
                <div className="bg-green-100 p-4 rounded-2xl text-green-700"><Gavel size={24} /></div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{lang === 'en' ? 'Legal Standing' : 'আইনি মর্যাদা'}</h4>
                  <p className="text-slate-600 text-xs font-semibold leading-relaxed mt-1 whitespace-pre-line">
                    {lang === 'en' ? profile.role2_en : profile.role2_bn}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <button 
                onClick={() => onNavigate?.('vision')}
                className="bg-green-700 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-green-800 transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgba(21,128,61,0.4)] hover:-translate-y-1"
              >
                {t.hero.cta_manifesto} <ArrowRight size={22} />
              </button>
              <button 
                onClick={() => onNavigate?.('updates')}
                className="bg-white border-2 border-slate-200 text-slate-800 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:border-red-200 hover:text-red-700 transition-all flex items-center justify-center gap-3"
              >
                {t.hero.cta_updates}
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative group">
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-[16px] border-white bg-white ring-1 ring-slate-100 transform transition-transform duration-700 group-hover:scale-[1.02]">
              <img 
                src={CANDIDATE_IMAGE} 
                alt={profile.name_en}
                className="w-full h-auto object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            {/* Background elements for depth */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] -z-1 animate-pulse"></div>
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] -z-1 animate-pulse" style={{animationDelay: '1s'}}></div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-10 -right-6 md:-right-12 bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-50 z-20 flex items-center gap-4 animate-bounce-slow">
              <div className="bg-red-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Landmark size={24} />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">General</div>
                <div className="text-xl font-black text-slate-900 leading-none">2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;
