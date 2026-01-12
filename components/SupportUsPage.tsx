
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Heart, Share2, Handshake, Mail, MapPin, Phone, CheckCircle, Scale, Star, Building2, User, Briefcase, Home, Landmark, Gavel } from 'lucide-react';
import { Language, TRANSLATIONS } from '../constants';
import { getData, saveData } from '../services/storageService';

interface SupportUsPageProps {
  onBack: () => void;
  lang: Language;
}

const SupportUsPage: React.FC<SupportUsPageProps> = ({ onBack, lang }) => {
  const t = TRANSLATIONS[lang];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [config, setConfig] = useState<any>(null);
  const [form, setForm] = useState({
    fullName: '',
    gender: '',
    profession: '',
    phone: '',
    email: '',
    thana: '',
    union: '',
    village: '',
    pollingStation: '',
    role: ''
  });

  useEffect(() => {
    setConfig(getData('SUPPORT_CONFIG'));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save volunteer registration
    const existingVolunteers = getData('VOLUNTEERS') || [];
    const newVolunteer = {
      ...form,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    saveData('VOLUNTEERS', [newVolunteer, ...existingVolunteers]);
    
    setIsSubmitted(true);
  };

  const handleThanaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, thana: e.target.value, union: '' });
  };

  if (!config) return null;

  const availableUnions = form.thana ? (TRANSLATIONS[lang].feedback.unions as any)[form.thana] || [] : [];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center gap-2 text-green-700 font-semibold mb-8 hover:text-green-800 transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          {t.nav.back}
        </button>

        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-slate-100 mb-12 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-serif">
              {lang === 'en' ? 'Support the ' : 'আন্দোলনে '}<span className="text-green-700">{lang === 'en' ? 'Movement' : 'যোগ দিন'}</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">{t.support.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Form Column */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 font-serif flex items-center gap-3">
              <Users className="text-green-700" /> {t.support.form_title}
            </h2>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 p-12 rounded-[2rem] text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"><CheckCircle size={40} /></div>
                <h3 className="text-3xl font-bold text-green-800 mb-4">{t.support.form_thanks}</h3>
                <p className="text-green-700 text-lg">{t.support.form_success}</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-10 text-green-700 font-bold hover:underline"
                >
                  {lang === 'en' ? 'Register another volunteer' : 'অন্য আরেকটি স্বেচ্ছাসেবক নিবন্ধন করুন'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                      <User size={16} className="text-green-700"/> {t.support.form_name}
                    </label>
                    <input required type="text" className="form-input-custom" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                      <Handshake size={16} className="text-green-700"/> {t.support.form_gender}
                    </label>
                    <select required className="form-input-custom appearance-none cursor-pointer" value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}>
                      <option value="">{lang === 'en' ? 'Select Gender' : 'লিঙ্গ নির্বাচন করুন'}</option>
                      {TRANSLATIONS[lang].feedback.gender_options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                      <Briefcase size={16} className="text-green-700"/> {t.support.form_profession}
                    </label>
                    <input required type="text" className="form-input-custom" value={form.profession} onChange={e => setForm({...form, profession: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                      <Phone size={16} className="text-green-700"/> {t.support.form_phone}
                    </label>
                    <input required type="tel" className="form-input-custom" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                      <Mail size={16} className="text-green-700"/> {t.support.form_email}
                    </label>
                    <input required type="email" className="form-input-custom" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                </div>

                {/* Location Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                      <MapPin size={16} className="text-green-700"/> {t.support.form_thana}
                    </label>
                    <select required className="form-input-custom appearance-none cursor-pointer" value={form.thana} onChange={handleThanaChange}>
                      <option value="">{lang === 'en' ? 'Select Upazila' : 'উপজেলা নির্বাচন করুন'}</option>
                      {TRANSLATIONS[lang].feedback.thana_options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                      <Building2 size={16} className="text-green-700"/> {t.support.form_union}
                    </label>
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
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                      <Home size={16} className="text-green-700"/> {t.support.form_village}
                    </label>
                    <input required type="text" className="form-input-custom" value={form.village} onChange={e => setForm({...form, village: e.target.value})} />
                  </div>
                </div>

                {/* Role and Polling Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                      <Landmark size={16} className="text-green-700"/> {t.support.form_polling}
                    </label>
                    <input required type="text" className="form-input-custom" placeholder={lang === 'en' ? "Station Name / Number" : "ভোটকেন্দ্রের নাম/নম্বর"} value={form.pollingStation} onChange={e => setForm({...form, pollingStation: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                      <Gavel size={16} className="text-green-700"/> {t.support.form_role}
                    </label>
                    <select required className="form-input-custom appearance-none cursor-pointer" value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                      <option value="">{lang === 'en' ? 'Select Preferred Role' : 'আপনার ভূমিকা নির্বাচন করুন'}</option>
                      {config.volunteer_roles.map((role: any, idx: number) => (
                        <option key={idx} value={role.title_en}>{lang === 'en' ? role.title_en : role.title_bn}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-6 rounded-2xl shadow-xl transition-all text-xl shadow-[0_20px_40px_-10px_rgba(21,128,61,0.3)]">
                  {t.support.form_submit}
                </button>
              </form>
            )}
          </div>

          {/* Info Column */}
          <div className="space-y-8">
            <div className="bg-red-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <h2 className="text-3xl font-bold mb-6 font-serif flex items-center gap-3"><Heart /> {t.support.financial_title}</h2>
              <p className="text-red-50 mb-8 text-lg">{t.support.financial_desc}</p>
              <div className="bg-white/10 border border-white/20 p-6 rounded-2xl backdrop-blur-sm">
                <p className="text-xs uppercase font-bold tracking-widest text-red-200 mb-2">{t.support.bank_label}</p>
                <p className="font-mono text-xl md:text-2xl font-bold">{config.bank_account}</p>
                <p className="font-mono text-lg text-red-100">{config.bank_number}</p>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
               <h3 className="text-xl font-bold mb-6 text-slate-900 flex items-center gap-3"><Star className="text-yellow-500" fill="currentColor"/> {lang === 'en' ? 'Why Volunteer?' : 'কেন স্বেচ্ছাসেবক হবেন?'}</h3>
               <ul className="space-y-4 text-slate-600">
                  <li className="flex gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={18} />
                    <span>{lang === 'en' ? 'Help build a just legal system for all.' : 'সবার জন্য ন্যায়সঙ্গত আইনি ব্যবস্থা গঠনে সহায়তা করুন।'}</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={18} />
                    <span>{lang === 'en' ? 'Work directly with grassroots leaders.' : 'তৃণমূল নেতাদের সাথে সরাসরি কাজ করার সুযোগ।'}</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={18} />
                    <span>{lang === 'en' ? 'Contribute to the Vision 2030 Roadmap.' : 'ভিশন ২০৩০ রূপরেখায় অবদান রাখুন।'}</span>
                  </li>
               </ul>
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

export default SupportUsPage;
