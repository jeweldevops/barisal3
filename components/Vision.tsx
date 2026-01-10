
import React from 'react';
import { getManifestoPoints, TRANSLATIONS, Language } from '../constants';

interface VisionProps {
  lang: Language;
}

const Vision: React.FC<VisionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const points = getManifestoPoints(lang);
  
  return (
    <section id="vision" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-green-700 font-bold uppercase tracking-widest text-sm mb-4">{t.vision.heading}</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t.vision.subheading}</h3>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t.vision.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => (
            <div 
              key={index}
              className="group p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-green-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6 inline-block p-4 bg-white rounded-xl shadow-sm text-green-700 group-hover:scale-110 transition-transform">
                {point.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">{point.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vision;
