
import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Award, Landmark, Gavel, ShieldCheck, Timer, Target, Users, Zap, Newspaper } from 'lucide-react';
import { CANDIDATE_IMAGE, TRANSLATIONS, Language, ELECTION_DATE } from '../constants';

interface HeroProps {
  onNavigate?: (page: 'home' | 'vision' | 'biography' | 'updates' | 'ai-assistant' | 'support-us') => void;
  lang: Language;
  profile: any;
}

const Hero: React.FC<HeroProps> = ({ onNavigate, lang, profile }) => {
  const t = TRANSLATIONS[lang];
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(ELECTION_DATE) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    const timer = setInterval(calculateTime, 1000);
    calculateTime();
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-10 skew-x-[-12deg] translate-x-1/2"></div>
      <div className="absolute left-10 top-1/2 -translate-y-1/2 text-[20vw] font-black text-slate-50 select-none -z-10 opacity-50">2026</div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-black mb-8 shadow-xl border border-slate-800 animate-pulse">
              <Zap size={18} className="text-yellow-400" />
              {lang === 'en' ? 'MISSION 2026 IN PROGRESS' : 'মিশন ২০২৬ চলমান'}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] text-slate-900 mb-6 font-serif tracking-tight">
              {lang === 'en' ? 'Advocate ' : ''}<span className="text-red-600">{lang === 'en' ? profile.name_en.replace('Advocate ', '') : profile.name_bn.replace('এ্যাডভোকেট ', '')}</span>
            </h1>
            
            <p className="text-green-800 font-black text-xl md:text-2xl mb-10 leading-snug max-w-2xl mx-auto lg:mx-0">
              {lang === 'en' ? profile.nominee_full_en : profile.nominee_full_bn}
            </p>

            {/* Countdown Component */}
            <div className="grid grid-cols-4 gap-3 md:gap-4 mb-12 max-w-xl mx-auto lg:mx-0">
              {[
                { label: lang === 'en' ? 'Days' : 'দিন', value: timeLeft.days },
                { label: lang === 'en' ? 'Hrs' : 'ঘণ্টা', value: timeLeft.hours },
                { label: lang === 'en' ? 'Min' : 'মিনিট', value: timeLeft.minutes },
                { label: lang === 'en' ? 'Sec' : 'সেকেন্ড', value: timeLeft.seconds }
              ].map((item, i) => (
                <div key={i} className="bg-white border-2 border-slate-100 p-4 rounded-3xl shadow-sm text-center group hover:border-red-200 transition-all">
                  <div className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-red-600 transition-colors">{item.value.toString().padStart(2, '0')}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">{item.label}</div>
                </div>
              ))}
            </div>

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
                className="relative group bg-gradient-to-br from-green-600 to-green-800 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgba(21,128,61,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(21,128,61,0.6)] hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10">{t.hero.cta_manifesto}</span>
                <ArrowRight size={22} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => onNavigate?.('updates')}
                className="group bg-white border-2 border-slate-900 text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
              >
                <Newspaper size={20} className="group-hover:rotate-12 transition-transform" />
                <span>{t.hero.cta_updates}</span>
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative group">
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-[16px] border-white bg-white ring-1 ring-slate-100 transform transition-transform duration-700 group-hover:scale-[1.02]">
              <img 
                src={profile.image || CANDIDATE_IMAGE} 
                alt={profile.name_en}
                className="w-full h-auto object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Campaign Pillar Overlay */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-white flex justify-between items-center shadow-xl opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                 <div className="flex flex-col items-center gap-1">
                    <Target className="text-green-700" size={20}/>
                    <span className="text-[8px] font-black uppercase text-slate-500">Vision</span>
                 </div>
                 <div className="w-px h-8 bg-slate-200"></div>
                 <div className="flex flex-col items-center gap-1">
                    <Users className="text-red-600" size={20}/>
                    <span className="text-[8px] font-black uppercase text-slate-500">Grassroots</span>
                 </div>
                 <div className="w-px h-8 bg-slate-200"></div>
                 <div className="flex flex-col items-center gap-1">
                    <Gavel className="text-blue-600" size={20}/>
                    <span className="text-[8px] font-black uppercase text-slate-500">Justice</span>
                 </div>
              </div>
            </div>
            
            {/* Background elements for depth */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] -z-1 animate-pulse"></div>
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] -z-1 animate-pulse" style={{animationDelay: '1s'}}></div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-10 -right-6 md:-right-12 bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white z-20 flex items-center gap-4 animate-bounce-slow">
              <div className="bg-red-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg relative overflow-hidden group/icon">
                <Landmark size={24} />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/icon:translate-y-0 transition-transform"></div>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">MANDATE</div>
                <div className="text-2xl font-black text-slate-900 leading-none tracking-tighter">2026</div>
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
