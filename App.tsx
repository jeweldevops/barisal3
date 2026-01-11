
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Vision from './components/Vision';
import VisionPage from './components/VisionPage';
import BiographyPage from './components/BiographyPage';
import UpdatesPage from './components/UpdatesPage';
import AIAssistantPage from './components/AIAssistantPage';
import SupportUsPage from './components/SupportUsPage';
import FeedbackPage from './components/FeedbackPage';
import AdminDashboard from './components/AdminDashboard';
import BnpLogo from './components/BnpLogo';
import { initStorage, getData } from './services/storageService';
import { TRANSLATIONS, Language, CANDIDATE_IMAGE, CANDIDATE_NAME, CANDIDATE_NAME_BN, PARTY, PARTY_BN, CONTACT_PHONE, CONTACT_EMAIL, OFFICE_ADDRESS_EN, OFFICE_ADDRESS_BN } from './constants';
import { Calendar, ChevronRight, Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram, ArrowRight, Sparkles, Bot, Lock, Music, X, User, Building2, Camera, MessageCircle, Lightbulb } from 'lucide-react';

const SESSION_KEY = 'zainul_admin_session';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'vision' | 'biography' | 'updates' | 'ai-assistant' | 'support-us' | 'feedback' | 'admin'>('home');
  const [lang, setLang] = useState<Language>('en');
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  // Initialize data storage and check session
  useEffect(() => {
    initStorage();
    const savedSession = localStorage.getItem(SESSION_KEY);
    if (savedSession) {
      try {
        const admin = JSON.parse(savedSession);
        // Verify admin still exists in storage
        const admins = getData('ADMINS') || [];
        const exists = admins.find((a: any) => a.username === admin.username);
        if (exists) {
          setCurrentAdmin(exists);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      } catch (e) {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  const t = TRANSLATIONS[lang];
  const dynamicNews = getData('NEWS')?.[lang] || [];
  
  // Robust fallback to prevent null access errors on initial mount
  const profile = getData('PROFILE') || {
    name_en: CANDIDATE_NAME,
    name_bn: CANDIDATE_NAME_BN,
    party_en: PARTY,
    party_bn: PARTY_BN,
    phone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    addr_en: OFFICE_ADDRESS_EN,
    addr_bn: OFFICE_ADDRESS_BN,
    role1_en: TRANSLATIONS.en.hero.role1,
    role1_bn: TRANSLATIONS.bn.hero.role1,
    role2_en: TRANSLATIONS.en.hero.role2,
    role2_bn: TRANSLATIONS.bn.hero.role2,
    image: CANDIDATE_IMAGE
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const admins = getData('ADMINS') || [];
    const validAdmin = admins.find((a: any) => a.username === user && a.password === pass);

    if (validAdmin) {
      setCurrentAdmin(validAdmin);
      localStorage.setItem(SESSION_KEY, JSON.stringify(validAdmin));
      setShowLogin(false);
      setCurrentPage('admin');
      setPass('');
      setUser('');
    } else {
      alert('Invalid Username or Password');
    }
  };

  const handleLogout = () => {
    setCurrentAdmin(null);
    localStorage.removeItem(SESSION_KEY);
    setCurrentPage('home');
  };

  const renderFooter = () => (
    <footer className="bg-slate-900 text-white py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-700 p-2 rounded-lg text-white">
                <BnpLogo size={28} />
              </div>
              <div className="text-2xl font-bold">
                {lang === 'en' ? profile.name_en : profile.name_bn} <span className="text-green-500">{lang === 'en' ? 'Barisal-3' : 'বরিশাল-৩'}</span>
              </div>
            </div>
            <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
              {lang === 'en' ? profile.party_en + ' Nominated MP candidate' : profile.party_bn + ' মনোনীত সংসদ সদস্য প্রার্থী'}
            </p>
            
            <div className="space-y-4">
              <h5 className="text-xs uppercase font-black tracking-[0.2em] text-slate-500">
                {lang === 'en' ? 'Follow the Campaign' : 'ক্যাম্পেইন অনুসরণ করুন'}
              </h5>
              <div className="flex flex-wrap gap-4">
                <a href="https://facebook.com/advocatezainulabedin/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-green-700 transition-all"><Facebook size={20} /></a>
                <a href="https://x.com/AdvZainulAbedin" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-green-700 transition-all"><Twitter size={20} /></a>
                <a href="https://www.youtube.com/@advocatezainulabedin" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-green-700 transition-all"><Youtube size={20} /></a>
                <a href="https://www.instagram.com/adv.zabedin/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-green-700 transition-all"><Instagram size={20} /></a>
                <a href="https://www.tiktok.com/@adv.zainulabedin" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-green-700 transition-all"><Music size={20} /></a>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold text-lg mb-6">{t.footer.links}</h5>
            <ul className="space-y-4 text-slate-400">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-red-400 transition-colors">{t.nav.home}</button></li>
              <li><button onClick={() => setCurrentPage('vision')} className="hover:text-red-400 transition-colors">{t.nav.vision}</button></li>
              <li><button onClick={() => setCurrentPage('biography')} className="hover:text-red-400 transition-colors">{t.nav.biography}</button></li>
              <li><button onClick={() => setCurrentPage('updates')} className="hover:text-red-400 transition-colors">{t.nav.updates}</button></li>
              <li><button onClick={() => setCurrentPage('feedback')} className="hover:text-red-400 transition-colors">{t.nav.feedback}</button></li>
              <li>
                {currentAdmin ? (
                  <button onClick={() => setCurrentPage('admin')} className="hover:text-green-500 transition-colors flex items-center gap-1 font-bold text-green-500"><Lock size={12}/> Dashboard</button>
                ) : (
                  <button onClick={() => setShowLogin(true)} className="hover:text-green-500 transition-colors flex items-center gap-1"><Lock size={12}/> Admin CMS</button>
                )}
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold text-lg mb-6">{t.footer.contact}</h5>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3"><MapPin size={18} className="text-red-500" /> {lang === 'en' ? profile.addr_en : profile.addr_bn}</li>
              <li className="flex items-center gap-3"><Phone size={18} className="text-red-500" /> {profile.phone}</li>
              <li className="flex items-center gap-3"><Mail size={18} className="text-red-500" /> {profile.email}</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} {t.footer.rights}
        </div>
      </div>
    </footer>
  );

  if (currentPage === 'admin' && currentAdmin) return (
    <AdminDashboard onLogout={handleLogout} lang={lang} setLang={setLang} />
  );

  return (
    <div className="min-h-screen">
      <Navbar onNavigate={setCurrentPage} lang={lang} setLang={setLang} />
      
      {showLogin && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-sm w-full shadow-2xl relative">
            <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900"><X size={24}/></button>
            <h3 className="text-2xl font-bold mb-6 text-center">CMS Access</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Username" 
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 pl-10 outline-none focus:ring-2 focus:ring-green-700"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 pl-10 outline-none focus:ring-2 focus:ring-green-700"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <button className="w-full bg-green-700 text-white font-bold py-3 rounded-xl hover:bg-green-800 transition-all">Login to Dashboard</button>
            </form>
            <p className="mt-4 text-xs text-center text-slate-400">Campaign Management System v1.1</p>
          </div>
        </div>
      )}

      {currentPage === 'vision' ? (
        <VisionPage onBack={() => setCurrentPage('home')} lang={lang} />
      ) : currentPage === 'biography' ? (
        <BiographyPage onBack={() => setCurrentPage('home')} lang={lang} currentAdmin={currentAdmin} />
      ) : currentPage === 'updates' ? (
        <UpdatesPage onBack={() => setCurrentPage('home')} lang={lang} />
      ) : currentPage === 'ai-assistant' ? (
        <AIAssistantPage onBack={() => setCurrentPage('home')} lang={lang} />
      ) : currentPage === 'support-us' ? (
        <SupportUsPage onBack={() => setCurrentPage('home')} lang={lang} />
      ) : currentPage === 'feedback' ? (
        <FeedbackPage onBack={() => setCurrentPage('home')} lang={lang} />
      ) : (
        <main>
          <Hero onNavigate={setCurrentPage} lang={lang} />
          
          <section id="updates" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">{lang === 'en' ? 'On the Ground' : 'মাঠ পর্যায়ে'}</h2>
                  <h3 className="text-4xl font-bold text-slate-900">{t.nav.updates}</h3>
                </div>
                <button onClick={() => setCurrentPage('updates')} className="hidden md:flex items-center gap-2 text-green-700 font-bold hover:text-green-800 transition-colors">
                  {lang === 'en' ? 'View All News' : 'সব খবর দেখুন'} <ChevronRight size={20} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {dynamicNews.slice(0, 3).map((news: any) => (
                  <div key={news.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                    <div className="aspect-video relative overflow-hidden">
                      <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{news.title}</h4>
                      <p className="text-slate-600 text-sm mb-6 line-clamp-2">{news.excerpt}</p>
                      <button onClick={() => setCurrentPage('updates')} className="text-red-600 font-bold text-sm flex items-center gap-1">{lang === 'en' ? 'Read Report' : 'প্রতিবেদন পড়ুন'} <ChevronRight size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div id="vision"><Vision lang={lang} /></div>
          
          <section id="bio" className="py-24 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <h2 className="text-red-500 font-bold uppercase tracking-widest text-sm mb-4">{lang === 'en' ? 'Legal & Political Journey' : 'আইনি ও রাজনৈতিক পথচলা'}</h2>
                  <h3 className="text-4xl md:text-5xl font-bold mb-8">{lang === 'en' ? `About ${profile.name_en}` : `${profile.name_bn} সম্পর্কে`}</h3>
                  <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                    <p>{t.bio.subtitle}</p>
                    <button onClick={() => setCurrentPage('biography')} className="text-red-400 font-bold flex items-center gap-2 group">{lang === 'en' ? 'Read Full Biography' : 'সম্পূর্ণ জীবনী পড়ুন'} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></button>
                  </div>
                </div>
                <div className="order-1 lg:order-2 relative">
                  <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border border-slate-700">
                    <img src={profile.image || CANDIDATE_IMAGE} alt={profile.name_en} className="w-full h-auto object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* New Feedback/Opinion Section on Home Page */}
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
                <div className="relative z-10 max-w-2xl text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 border border-green-200 text-green-700 text-sm font-bold mb-6">
                    <Lightbulb size={16} /> {lang === 'en' ? 'Participatory Policy' : 'অংশগ্রহণমূলক নীতি'}
                  </div>
                  <h3 className="text-4xl font-bold mb-6 text-slate-900">{t.feedback.title}</h3>
                  <p className="text-xl text-slate-600 mb-8">{t.feedback.subtitle}</p>
                  <button onClick={() => setCurrentPage('feedback')} className="bg-green-700 hover:bg-green-800 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl flex items-center justify-center gap-3 group mx-auto lg:mx-0">
                    {t.feedback.submit} <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                <div className="relative z-10 hidden lg:block">
                  <div className="w-64 h-64 bg-green-700 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl rotate-3 group">
                    <MessageCircle size={100} className="group-hover:rotate-12 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
                 <div className="relative z-10 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-950/50 border border-green-500/30 text-green-400 text-sm font-semibold mb-6"><Sparkles size={16} /> {t.ai.badge}</div>
                    <h3 className="text-4xl font-bold mb-6">{t.ai.heading}</h3>
                    <p className="text-xl text-slate-400 max-w-xl mb-8">{t.ai.desc}</p>
                    <button onClick={() => setCurrentPage('ai-assistant')} className="bg-green-700 hover:bg-green-600 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl flex items-center gap-3">
                      {t.ai.cta} <Bot size={24} />
                    </button>
                 </div>
                 <div className="relative z-10 w-full max-w-sm hidden md:block">
                    <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-2xl rotate-2">
                      <div className="flex gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center"><Bot size={20} /></div>
                        <div className="bg-slate-700 p-3 rounded-2xl rounded-tl-none text-sm italic">"{t.ai.prompt1}"</div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </section>
        </main>
      )}
      {currentPage !== 'admin' && renderFooter()}
    </div>
  );
};

export default App;
