
import React, { useState } from 'react';
import { ArrowLeft, Send, MessageCircle, CheckCircle, Lightbulb, ShieldCheck, MapPin, Users, BookOpen, HeartPulse, Tractor, Laptop, Gavel, Building2, User, Phone, Mail, Home, Briefcase, Landmark } from 'lucide-react';
import { Language, TRANSLATIONS, CANDIDATE_NAME, CANDIDATE_NAME_BN } from '../constants';
import { getData, saveData } from '../services/storageService';

interface FeedbackPageProps {
  onBack: () => void;
  lang: Language;
}

const FeedbackPage: React.FC<FeedbackPageProps> = ({ onBack, lang }) => {
  const t = TRANSLATIONS[lang];
  const [form, setForm] = useState({ 
    fullName: '', 
    gender: '', 
    profession: '', 
    organization: '', 
    phone: '', 
    email: '', 
    thana: '', 
    union: '', 
    village: '', 
    category: '', 
    suggestion: '' 
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Persist data
    const existingSuggestions = getData('SUGGESTIONS') || [];
    const newEntry = {
      ...form,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    
    saveData('SUGGESTIONS', [newEntry, ...existingSuggestions]);
    
    setIsSubmitted(true);
  };

  const handleThanaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setForm({ ...form, thana: value, union: '' }); // Reset union when thana changes
  };

  const priorityAreas = [
    { name: lang === 'en' ? 'Infrastructure' : 'অবকাঠামো', icon: <Building2 className="text-slate-700" size={24}/> },
    { name: lang === 'en' ? 'Education' : 'শিক্ষা', icon: <BookOpen className="text-slate-700" size={24}/> },
    { name: lang === 'en' ? 'Healthcare' : 'স্বাস্থ্যসেবা', icon: <HeartPulse className="text-slate-700" size={24}/> },
    { name: lang === 'en' ? 'Agriculture' : 'কৃষি', icon: <Tractor className="text-slate-700" size={24}/> },
    { name: lang === 'en' ? 'Youth & IT' : 'তরুণ ও আইটি', icon: <Laptop className="text-slate-700" size={24}/> },
    { name: lang === 'en' ? 'Legal Reform' : 'আইনি সংস্কার', icon: <Gavel className="text-slate-700" size={24}/> },
  ];

  // Get current available unions based on selected thana
  const availableUnions = form.thana ? (t.feedback.unions as any)[form.thana] || [] : [];

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

        {/* Hero Banner */}
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-20 text-white shadow-2xl mb-16 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-700/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-green-400 text-sm font-bold mb-8">
              <Lightbulb size={18} />
              {lang === 'en' ? 'Mission 2026 Participation' : 'মিশন ২০২৬ অংশগ্রহণ'}
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 font-serif">
              {t.feedback.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium">
              {t.feedback.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Priority */}
          <div className="lg:col-span-4 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <ShieldCheck className="text-green-700" /> {lang === 'en' ? 'Why Your Opinion Matters' : 'কেন আপনার মতামত গুরুত্বপূর্ণ'}
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
                {lang === 'en' 
                  ? `Senior Advocate Zainul Abedin believes that a true representative serves the pulse of the people. Your suggestions will directly influence our priorities for Barisal-3 in the 2026 General Election.`
                  : `সিনিয়র এ্যাডভোকেট জয়নুল আবেদীন বিশ্বাস করেন যে একজন প্রকৃত প্রতিনিধি জনগণের প্রাণের স্পন্দন অনুযায়ী সেবা করেন। আপনার প্রস্তাবনাগুলো ২০২৬ সালের জাতীয় নির্বাচনে বরিশাল-৩ এর জন্য আমাদের অগ্রাধিকারগুলোকে সরাসরি প্রভাবিত করবে।`}
              </p>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold mb-8 text-slate-900">{lang === 'en' ? 'Core Priority Areas' : 'প্রধান অগ্রাধিকার ক্ষেত্রসমূহ'}</h3>
              <div className="grid grid-cols-2 gap-4">
                {priorityAreas.map((area, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-3 hover:bg-green-50 transition-colors cursor-default">
                    {area.icon}
                    <span className="font-bold text-sm text-slate-800">{area.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-green-700 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
               <p className="text-lg italic font-medium relative z-10">
                 {lang === 'en' 
                   ? '"I am committed to reflecting the voice of every citizen in Babuganj and Muladi in our collective vision for a prosperous future."'
                   : '"আমি বাবুগঞ্জ ও মুলাদীর প্রতিটি নাগরিকের কণ্ঠস্বর আমাদের সমৃদ্ধ ভবিষ্যতের সম্মিলিত রূপরেখায় প্রতিফলিত করতে অঙ্গীকারবদ্ধ।"'}
               </p>
               <p className="mt-4 font-bold text-green-200">— {lang === 'en' ? CANDIDATE_NAME : CANDIDATE_NAME_BN}</p>
            </div>
          </div>

          {/* Right Column: Suggestion Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
              {isSubmitted ? (
                <div className="py-20 text-center animate-fade-in">
                  <div className="w-24 h-24 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_20px_40px_-10px_rgba(21,128,61,0.5)]">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">{t.feedback.success_title}</h3>
                  <p className="text-slate-600 text-lg max-w-md mx-auto leading-relaxed">{t.feedback.success_desc}</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-10 text-green-700 font-bold hover:underline"
                  >
                    {lang === 'en' ? 'Submit another suggestion' : 'অন্য আরেকটি প্রস্তাব পাঠান'}
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-slate-900 mb-10 font-serif">{t.feedback.form_heading}</h2>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2"><User size={16} className="text-green-700"/> {t.feedback.fullName}</label>
                        <input required type="text" className="form-input-custom" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2"><Users size={16} className="text-green-700"/> {t.feedback.gender}</label>
                        <select required className="form-input-custom appearance-none cursor-pointer" value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}>
                          <option value="">{lang === 'en' ? 'Select Gender' : 'লিঙ্গ নির্বাচন করুন'}</option>
                          {t.feedback.gender_options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Professional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2"><Briefcase size={16} className="text-green-700"/> {t.feedback.profession}</label>
                        <input required type="text" className="form-input-custom" value={form.profession} onChange={e => setForm({...form, profession: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2"><Landmark size={16} className="text-green-700"/> {t.feedback.organization}</label>
                        <input required type="text" className="form-input-custom" value={form.organization} onChange={e => setForm({...form, organization: e.target.value})} />
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2"><Phone size={16} className="text-green-700"/> {t.feedback.phone}</label>
                        <input required type="tel" className="form-input-custom" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2"><Mail size={16} className="text-green-700"/> {t.feedback.email}</label>
                        <input required type="email" className="form-input-custom" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                      </div>
                    </div>

                    {/* Location Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2"><MapPin size={16} className="text-green-700"/> {t.feedback.thana}</label>
                        <select required className="form-input-custom appearance-none cursor-pointer" value={form.thana} onChange={handleThanaChange}>
                          <option value="">{lang === 'en' ? 'Select Upazila' : 'উপজেলা নির্বাচন করুন'}</option>
                          {t.feedback.thana_options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2"><Building2 size={16} className="text-green-700"/> {t.feedback.union}</label>
                        <select 
                          required 
                          className={`form-input-custom appearance-none cursor-pointer ${!form.thana ? 'opacity-50 cursor-not-allowed' : ''}`} 
                          value={form.union} 
                          onChange={e => setForm({...form, union: e.target.value})}
                          disabled={!form.thana}
                        >
                          <option value="">{lang === 'en' ? 'Select Union' : 'ইউনিয়ন নির্বাচন করুন'}</option>
                          {availableUnions.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2"><Home size={16} className="text-green-700"/> {t.feedback.village}</label>
                        <input required type="text" className="form-input-custom" value={form.village} onChange={e => setForm({...form, village: e.target.value})} />
                      </div>
                    </div>

                    {/* Suggestion Details */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2"><Gavel size={16} className="text-green-700"/> {t.feedback.category}</label>
                        <select required className="form-input-custom appearance-none cursor-pointer" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                          <option value="">{lang === 'en' ? 'Select Policy Category' : 'বিভাগ নির্বাচন করুন'}</option>
                          {t.feedback.categories.map((cat: string) => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2"><MessageCircle size={16} className="text-green-700"/> {t.feedback.message}</label>
                        <textarea 
                          required 
                          rows={6}
                          placeholder={lang === 'en' ? 'Describe your suggestion or area of improvement...' : 'আপনার স্বপ্ন বা উন্নয়ন প্রস্তাবটি বর্ণনা করুন...'}
                          className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] py-5 px-6 focus:ring-2 focus:ring-green-700 outline-none transition-all shadow-inner resize-none"
                          value={form.suggestion}
                          onChange={e => setForm({...form, suggestion: e.target.value})}
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-6 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 text-xl hover:-translate-y-1 active:scale-95 shadow-[0_20px_40px_-10px_rgba(21,128,61,0.3)]"
                    >
                      {t.feedback.submit} <Send size={24} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .form-input-custom {
          width: 100%;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.25rem 1.5rem;
          outline: none;
          transition: all 0.2s;
          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
        }
        .form-input-custom:focus {
          border-color: #15803d;
          box-shadow: 0 0 0 2px rgba(21, 128, 61, 0.2);
          background-color: #fff;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FeedbackPage;
