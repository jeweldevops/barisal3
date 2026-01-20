
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Shield, HeartHandshake, Briefcase, GraduationCap, Sparkles, Heart, Lightbulb, MessageCircle, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Language, TRANSLATIONS, CANDIDATE_NAME, CANDIDATE_NAME_BN } from '../constants';
import { getData } from '../services/storageService';

interface WomenDevelopmentPageProps {
  onBack: () => void;
  onFeedback: () => void;
  lang: Language;
}

const WomenDevelopmentPage: React.FC<WomenDevelopmentPageProps> = ({ onBack, onFeedback, lang }) => {
  const t = TRANSLATIONS[lang];
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const data = getData('WOMEN');
    if (data) setContent(data[lang]);
  }, [lang]);

  if (!content) return null;

  const icons = [
    <Shield className="text-purple-600" size={32} />, 
    <Briefcase className="text-purple-600" size={32} />, 
    <HeartHandshake className="text-purple-600" size={32} />, 
    <GraduationCap className="text-purple-600" size={32} />,
    <CreditCard className="text-teal-600" size={32} />
  ];
  
  const colors = [
    "from-purple-500/10 to-purple-600/5", 
    "from-pink-500/10 to-pink-600/5", 
    "from-indigo-500/10 to-indigo-600/5", 
    "from-rose-500/10 to-rose-600/5",
    "from-teal-500/10 to-teal-600/5"
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-semibold mb-8 hover:text-purple-700 transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          {t.nav.back}
        </button>

        <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 p-8 md:p-20 text-white mb-16 shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-600/20 to-transparent"></div>
          <div className="relative z-10 max-w-4xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-700/30 border border-purple-500/30 text-purple-400 text-sm font-black mb-8">
              <Sparkles size={18} /> {lang === 'en' ? 'WOMEN\'S VISION 2026' : 'নারীদের ভিশন ২০২৬'}
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight font-serif italic">
              {lang === 'en' ? 'Empowering Women' : 'নারী ক্ষমতায়ন'}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium mb-10 max-w-2xl">
              {content.subtitle}
            </p>
            <button onClick={onFeedback} className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-purple-50 transition-all flex items-center gap-3 mx-auto md:mx-0">
               {lang === 'en' ? 'Submit Your Suggestion' : 'আপনার প্রস্তাবনা দিন'} <Lightbulb size={24} className="text-yellow-500" />
            </button>
          </div>
        </div>

        {/* BNP Family Card Highlight Section */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden mb-24 flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-black mb-6 uppercase tracking-widest">
              {lang === 'en' ? 'Flagship Policy' : 'প্রধান নীতি'}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-serif italic">
              {lang === 'en' ? 'The BNP Family Card' : 'বিএনপি ফ্যামিলি কার্ড'}
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {lang === 'en' 
                ? "A revolutionary social safety net program designed to provide direct financial support and subsidized essential commodities to low-income families, with a primary focus on women heads of households." 
                : "অল্প আয়ের পরিবারের জন্য একটি বৈপ্লবিক সামাজিক নিরাপত্তা কর্মসূচি। এর মাধ্যমে সরাসরি আর্থিক সহায়তা এবং ভর্তুকি মূল্যে নিত্যপ্রয়োজনীয় পণ্য সরবরাহ করা হবে, যেখানে পরিবারের নারী সদস্যদের প্রধান হিসেবে অগ্রাধিকার দেওয়া হবে।"}
            </p>
            <ul className="space-y-4 mb-10">
              {[
                lang === 'en' ? "Monthly Subsistence Allowance" : "মাসিক জীবনধারণ ভাতা",
                lang === 'en' ? "Subsidized Essential Food Items" : "ভর্তুকি মূল্যে নিত্যপ্রয়োজনীয় খাদ্যদ্রব্য",
                lang === 'en' ? "Direct Transfer to Women's Accounts" : "সরাসরি নারীদের অ্যাকাউন্টে অর্থ প্রদান",
                lang === 'en' ? "Priority in Healthcare Services" : "স্বাস্থ্যসেবায় অগ্রাধিকার"
              ].map((point, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-800 font-bold">
                  <CheckCircle2 className="text-green-600" size={20} /> {point}
                </li>
              ))}
            </ul>
            <button onClick={onFeedback} className="inline-flex items-center gap-2 text-purple-700 font-black hover:gap-4 transition-all">
              {lang === 'en' ? 'Learn How to Apply' : 'আবেদন প্রক্রিয়া সম্পর্কে জানুন'} <ChevronRight size={20} />
            </button>
          </div>
          <div className="lg:w-1/2 bg-slate-900 flex items-center justify-center p-8 md:p-16 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            <div className="relative group cursor-zoom-in">
              <div className="absolute -inset-4 bg-purple-600/20 rounded-[2.5rem] blur-2xl group-hover:bg-purple-600/40 transition-all"></div>
              <img 
                src="https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/og.png" // Placeholder or reference to the uploaded asset if available. 
                // Since I cannot access the local asset directly, I will represent the visual description.
                // In a real build, this would be '/assets/family-card.png'
                alt="BNP Family Card Sample" 
                className="w-full max-w-lg h-auto rounded-[1.5rem] shadow-2xl relative z-10 border-4 border-white/10 group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Fallback to a styled representation if image link is dead
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `
                    <div class="w-full max-w-lg aspect-[1.6/1] bg-gradient-to-br from-[#A21F7E] to-[#6A1B9A] rounded-[2rem] p-6 text-white shadow-2xl border-4 border-white/20 flex flex-col justify-between relative overflow-hidden">
                       <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                       <div class="flex justify-between items-start">
                          <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1">
                             <div class="w-full h-full bg-red-600 rounded-full flex items-center justify-center text-[6px] font-bold">BNP</div>
                          </div>
                          <div class="text-right">
                             <div class="text-[10px] font-bold opacity-80">নমুনা কার্ড</div>
                             <div class="text-2xl font-black">ফ্যামিলি কার্ড</div>
                             <div class="text-[8px] opacity-70 italic">স্বাবলম্বী পরিবার গড়ার প্রতিশ্রুতি</div>
                          </div>
                       </div>
                       <div class="flex gap-4 items-center">
                          <div class="w-20 h-24 bg-slate-200 rounded-lg"></div>
                          <div class="flex-1 space-y-2">
                             <div class="text-sm font-bold">নাম : ফারিয়া পিংকি</div>
                             <div class="text-xs opacity-80">কার্ড নম্বর : ১২৩১২৩৪৫৬৭৮</div>
                             <div class="text-xs opacity-80">মেয়াদ : ৩১ ডিসেম্বর ২০৩১</div>
                          </div>
                       </div>
                       <div class="flex justify-between items-end">
                          <div class="text-[8px] opacity-50">স্বাক্ষর : ফারিয়া পিংকি</div>
                          <div class="w-12 h-8 bg-yellow-500/20 rounded flex items-center justify-center border border-yellow-500/30">
                             <div class="w-6 h-4 bg-yellow-600 rounded-sm"></div>
                          </div>
                       </div>
                    </div>
                  `;
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {content.pillars.map((p: any, i: number) => (
            <div key={i} className={`group relative bg-gradient-to-br ${colors[i]} rounded-[2.5rem] p-10 border border-slate-200 hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white shadow-sm ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
              <div className="relative z-10">
                <div className="bg-white p-5 rounded-2xl shadow-md mb-8 inline-block group-hover:scale-110 transition-transform">{icons[i]}</div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6 font-serif">{p.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-purple-700 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl text-center">
           <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
           <p className="text-2xl md:text-4xl italic font-medium leading-relaxed max-w-5xl mx-auto mb-12">
             {t.women.quote}
           </p>
           <div className="font-bold text-2xl">— {lang === 'en' ? CANDIDATE_NAME : CANDIDATE_NAME_BN}</div>
        </div>

        <div className="mt-20 text-center">
           <button onClick={onFeedback} className="inline-flex items-center gap-4 bg-slate-900 text-white px-12 py-6 rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-slate-800 hover:-translate-y-1 transition-all group">
              {lang === 'en' ? 'Share Your Ideas' : 'আপনার স্বপ্ন শেয়ার করুন'} <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default WomenDevelopmentPage;
