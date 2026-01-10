
import React, { useEffect, useState } from 'react';
import { CANDIDATE_NAME, Language, TRANSLATIONS } from '../constants';
import { getData } from '../services/storageService';
import { ArrowLeft, CheckCircle2, Scale, Droplets, Laptop, HeartPulse, Tractor, Landmark, Gavel, GraduationCap, Heart } from 'lucide-react';

interface VisionPageProps {
  onBack: () => void;
  lang: Language;
}

const VisionPage: React.FC<VisionPageProps> = ({ onBack, lang }) => {
  const t = TRANSLATIONS[lang];
  const [manifestoSectors, setManifestoSectors] = useState<any[]>([]);

  useEffect(() => {
    const data = getData('MANIFESTO');
    if (data) {
      // Map static icons back to the data (icons aren't stored in JSON)
      const icons = [
        <Scale className="w-10 h-10 text-green-700" />,
        <Droplets className="w-10 h-10 text-red-600" />,
        <Tractor className="w-10 h-10 text-green-700" />,
        <HeartPulse className="w-10 h-10 text-red-600" />,
        <Laptop className="w-10 h-10 text-green-700" />
      ];
      const localizedSectors = data[lang].map((s: any, i: number) => ({
        ...s,
        icon: icons[i] || <CheckCircle2 className="w-10 h-10 text-green-700" />
      }));
      setManifestoSectors(localizedSectors);
    }
  }, [lang]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-green-700 font-semibold mb-8 hover:text-green-800 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          {t.nav.back}
        </button>

        <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden mb-16">
          <div className="relative h-72 md:h-96 bg-slate-900 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-slate-900/80 z-10"></div>
            <img src="https://images.unsplash.com/photo-1541872703-74c5e443d1fe?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Vision" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-20">
              <div className="bg-red-600 px-6 py-2 rounded-full mb-6 text-white text-sm font-bold tracking-widest uppercase animate-pulse">
                {lang === 'en' ? 'Official Election Manifesto 2026' : 'অফিসিয়াল নির্বাচনী ইশতেহার ২০২৬'}
              </div>
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-4">
                {lang === 'en' ? 'A Blueprint for ' : 'উন্নয়নের '}<span className="text-green-500">{lang === 'en' ? 'Change' : 'রূপরেখা'}</span>
              </h1>
            </div>
          </div>

          <div className="p-8 md:p-16">
            <div className="max-w-4xl mx-auto text-center mb-24">
              <h2 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-6">{t.vision.pledge_title}</h2>
              <blockquote className="text-3xl md:text-4xl font-medium text-slate-800 italic leading-snug">
                {t.vision.pledge_quote}
              </blockquote>
              <cite className="block mt-8 text-green-700 font-bold text-xl not-italic">— {lang === 'en' ? CANDIDATE_NAME : 'এ্যাডভোকেট জয়নুল আবেদীন'}</cite>
            </div>

            <div className="space-y-20">
              {manifestoSectors.map((sector, idx) => (
                <div key={idx} className={`flex flex-col lg:flex-row gap-12 items-start ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="lg:w-1/3">
                    <div className="bg-slate-50 p-6 rounded-3xl mb-6 inline-block">{sector.icon}</div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">{sector.title}</h3>
                    <p className="text-slate-600 text-lg leading-relaxed">{sector.description}</p>
                  </div>
                  <div className="lg:w-2/3 space-y-4">
                    {sector.points.map((point: string, pIdx: number) => (
                      <div key={pIdx} className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center gap-4 hover:shadow-lg transition-all group">
                        <CheckCircle2 className="text-green-700 flex-shrink-0" size={24} />
                        <p className="text-slate-800 font-medium text-lg leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white shadow-2xl mb-16">
          <div className="text-center mb-16">
            <h2 className="text-green-500 font-bold uppercase tracking-widest text-sm mb-4">{t.vision.roadmap_title}</h2>
            <h3 className="text-3xl md:text-5xl font-bold">{t.vision.roadmap_subtitle}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { phase: lang === 'en' ? "Phase 1" : "ধাপ ১", focus: lang === 'en' ? "Immediate Relief" : "তাতক্ষণিক পদক্ষেপ", task: lang === 'en' ? "Erosion repairs setup." : "ভাঙন রোধে জরুরি মেরামত।" },
              { phase: lang === 'en' ? "Phase 2" : "ধাপ ২", focus: lang === 'en' ? "Infrastructure Launch" : "অবকাঠামো উন্নয়ন", task: lang === 'en' ? "Highway expansion starts." : "মহাসড়ক সম্প্রসারণ শুরু।" },
              { phase: lang === 'en' ? "Phase 3" : "ধাপ ৩", focus: lang === 'en' ? "Economic Engines" : "অর্থনৈতিক গতি", task: lang === 'en' ? "Vocational training focus." : "কারিগরি প্রশিক্ষণে জোর।" },
              { phase: lang === 'en' ? "Phase 4" : "ধাপ ৪", focus: lang === 'en' ? "Global Hub" : "গ্লোবাল হাব", task: lang === 'en' ? "Digital Governance complete." : "ডিজিটাল সুশাসন বাস্তবায়ন।" }
            ].map((step, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                <div className="text-red-400 font-bold mb-3">{step.phase}</div>
                <div className="text-xl font-bold mb-4">{step.focus}</div>
                <div className="text-slate-400 text-sm leading-relaxed">{step.task}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionPage;
