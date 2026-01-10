
import React, { useState } from 'react';
import { ArrowLeft, Users, Heart, Share2, Handshake, Mail, MapPin, Phone, CheckCircle, Download, ExternalLink, Scale, Star } from 'lucide-react';
import { CANDIDATE_NAME, PARTY, Language, TRANSLATIONS, CONTACT_PHONE, CONTACT_EMAIL, OFFICE_ADDRESS_EN, OFFICE_ADDRESS_BN } from '../constants';

interface SupportUsPageProps {
  onBack: () => void;
  lang: Language;
}

const SupportUsPage: React.FC<SupportUsPageProps> = ({ onBack, lang }) => {
  const t = TRANSLATIONS[lang];
  const [formState, setFormState] = useState({ name: '', email: '', area: '', role: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const volunteerRoles = [
    { 
      title: lang === 'en' ? "Door-to-Door Campaigning" : "দ্বারে দ্বারে প্রচার", 
      icon: <Users className="text-green-700" size={32} />, 
      bgColor: "bg-green-100",
      desc: lang === 'en' ? "Join our neighborhood teams to spread the message of justice." : "বিচারের বার্তা ছড়িয়ে দিতে আমাদের পাড়া-মহল্লা টিমে যোগ দিন।" 
    },
    { 
      title: lang === 'en' ? "Social Media Team" : "সোশ্যাল মিডিয়া টিম", 
      icon: <Share2 className="text-red-600" size={32} />, 
      bgColor: "bg-red-100",
      desc: lang === 'en' ? "Help amplify our digital presence and reach younger voters." : "ডিজিটাল মাধ্যমে আমাদের উপস্থিতি এবং তরুণ ভোটারদের কাছে পৌঁছাতে সাহায্য করুন।" 
    },
    { 
      title: lang === 'en' ? "Event Planning" : "イভেন্ট প্ল্যানিং", 
      icon: <Handshake className="text-green-700" size={32} />, 
      bgColor: "bg-green-100",
      desc: lang === 'en' ? "Assist in organizing rallies, town halls, and local gatherings." : "জনসভা, মতবিনিময় সভা এবং স্থানীয় জমায়েত আয়োজনে সহায়তা করুন।" 
    },
    { 
      title: lang === 'en' ? "Legal Research" : "আইনি গবেষণা", 
      icon: <Scale className="text-red-600" size={32} />, 
      bgColor: "bg-red-100",
      desc: lang === 'en' ? "Support our legal team in constitutional and civic rights research." : "সাংবিধানিক ও নাগরিক অধিকার গবেষণায় আমাদের আইনি দলকে সহায়তা করুন।" 
    }
  ];

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

        {/* Hero Section */}
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-slate-100 mb-12 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-serif">
              {lang === 'en' ? 'Support the ' : 'আন্দোলনে '}<span className="text-green-700">{lang === 'en' ? 'Movement' : 'যোগ দিন'}</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">{t.support.subtitle}</p>
          </div>
        </div>

        {/* Volunteer Opportunities Grid */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-red-100 rounded-lg text-red-600"><Star size={20} fill="currentColor" /></div>
            <h2 className="text-3xl font-bold text-slate-900 font-serif">{lang === 'en' ? 'Volunteer Opportunities' : 'স্বেচ্ছাসেবী সুযোগসমূহ'}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {volunteerRoles.map((role, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group hover:-translate-y-2">
                <div className={`w-16 h-16 ${role.bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
                  {role.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 font-serif">{role.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 font-serif">{t.support.form_title}</h2>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 p-8 rounded-[2rem] text-center">
                <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"><CheckCircle size={32} /></div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">{t.support.form_thanks}</h3>
                <p className="text-green-700">{t.support.form_success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t.support.form_name}</label>
                  <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.support.form_email}</label>
                    <input type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.support.form_area}</label>
                    <select required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-green-500 outline-none transition-all appearance-none">
                      <option value="">{lang === 'en' ? 'Select Location' : 'এলাকা নির্বাচন করুন'}</option>
                      <option value="babuganj">Babuganj</option>
                      <option value="muladi">Muladi</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-5 rounded-2xl shadow-xl transition-all hover:shadow-2xl active:scale-95">
                  {t.support.form_submit}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-red-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <h2 className="text-3xl font-bold mb-6 font-serif">{t.support.financial_title}</h2>
              <p className="text-red-50 mb-8 text-lg">{t.support.financial_desc}</p>
              <div className="bg-white/10 border border-white/20 p-6 rounded-2xl backdrop-blur-sm">
                <p className="text-xs uppercase font-bold tracking-widest text-red-200 mb-2">{t.support.bank_label}</p>
                <p className="font-mono text-xl md:text-2xl font-bold">Zainul Campaign Fund</p>
                <p className="font-mono text-lg text-red-100">Acc: 102XXXXX231</p>
              </div>
            </div>
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-slate-900 font-serif">{t.support.media_kit}</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 border border-slate-200 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-all">
                  <Download size={18} className="text-green-700" />
                  {lang === 'en' ? 'Posters' : 'পোস্টার'}
                </button>
                <button className="flex items-center justify-center gap-2 border border-slate-200 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-all">
                  <Download size={18} className="text-red-600" />
                  {lang === 'en' ? 'Vision PDF' : 'ভিশন পিডিএফ'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 font-serif">{t.support.office_title}</h2>
            <p className="text-slate-400 mb-8 text-lg">{t.support.office_desc}</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-slate-300">
                <MapPin className="text-red-500" />
                <span>{lang === 'en' ? OFFICE_ADDRESS_EN : OFFICE_ADDRESS_BN}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <Mail className="text-green-500" />
                <span>{CONTACT_EMAIL}</span>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 text-center backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-green-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="relative z-10">
              <h4 className="text-2xl font-bold mb-4 font-serif text-green-400">{t.support.hotline}</h4>
              <p className="text-3xl md:text-4xl font-mono text-white font-black tracking-tighter">{CONTACT_PHONE}</p>
              <p className="text-slate-500 mt-4 text-sm uppercase tracking-widest font-bold">24/7 Available for Barisal-3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportUsPage;
