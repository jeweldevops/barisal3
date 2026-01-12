
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Newspaper, Target, UserCircle, Settings, LogOut, Plus, Trash2, Save, X, RefreshCcw, CheckCircle2, Lock, ShieldCheck, Upload, MessageSquare, Clock, MapPin, Flag, Rocket, Briefcase, Heart, Globe, Calendar, Edit3, Image as ImageIcon, Camera, Users
} from 'lucide-react';
import { getData, saveData, resetData } from '../services/storageService';
import { TRANSLATIONS, Language } from '../constants';

interface AdminDashboardProps {
  onLogout: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  profile: any;
  onProfileUpdate: (newProfile: any) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, lang, setLang, profile: globalProfile, onProfileUpdate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'news' | 'manifesto' | 'bio' | 'vision2030' | 'youth' | 'suggestions' | 'volunteers' | 'support' | 'settings'>('overview');
  const [news, setNews] = useState<any>(getData('NEWS'));
  const [manifesto, setManifesto] = useState<any>(getData('MANIFESTO'));
  const [bio, setBio] = useState<any>(getData('BIO'));
  const [profile, setProfile] = useState<any>(globalProfile);
  const [v2030, setV2030] = useState<any>(getData('VISION2030'));
  const [youth, setYouth] = useState<any>(getData('YOUTH'));
  const [support, setSupport] = useState<any>(getData('SUPPORT_CONFIG'));
  const [admins, setAdmins] = useState<any[]>(getData('ADMINS') || []);
  const [suggestions, setSuggestions] = useState<any[]>(getData('SUGGESTIONS') || []);
  const [volunteers, setVolunteers] = useState<any[]>(getData('VOLUNTEERS') || []);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (saveStatus) {
      const timer = setTimeout(() => setSaveStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  const handleSave = (key: any, data: any) => {
    try {
      saveData(key, data);
      setSaveStatus(lang === 'en' ? 'Changes saved successfully!' : 'পরিবর্তনগুলো সফলভাবে সেভ করা হয়েছে!');
      if (key === 'NEWS') setNews(data);
      if (key === 'MANIFESTO') setManifesto(data);
      if (key === 'BIO') setBio(data);
      if (key === 'PROFILE') { setProfile(data); onProfileUpdate(data); }
      if (key === 'VISION2030') setV2030(data);
      if (key === 'YOUTH') setYouth(data);
      if (key === 'SUPPORT_CONFIG') setSupport(data);
      if (key === 'ADMINS') setAdmins(data);
      if (key === 'VOLUNTEERS') setVolunteers(data);
    } catch (e) {
      alert("Storage limit exceeded. Try smaller text or images.");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { alert("Image too large (>1MB)"); return; }
      const reader = new FileReader();
      reader.onload = (ev) => callback(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // --- News Editor Helpers ---
  const addNews = () => {
    const newId = Date.now().toString();
    const newItemEn = { id: newId, date: "New Date", title: "New Headline", excerpt: "New description...", image: "https://picsum.photos/seed/"+newId+"/800/600", category: "General" };
    const newItemBn = { id: newId, date: "নতুন তারিখ", title: "নতুন শিরোনাম", excerpt: "নতুন বর্ণনা...", image: "https://picsum.photos/seed/"+newId+"/800/600", category: "সাধারণ" };
    const updated = { en: [newItemEn, ...news.en], bn: [newItemBn, ...news.bn] };
    handleSave('NEWS', updated);
  };

  const deleteNews = (id: string) => {
    const updated = { en: news.en.filter((n: any) => n.id !== id), bn: news.bn.filter((n: any) => n.id !== id) };
    handleSave('NEWS', updated);
  };

  // --- Manifesto Editor Helpers ---
  const addManifestoSector = () => {
    const updated = {
      en: [...manifesto.en, { title: "New Sector", description: "Desc", points: ["Point 1"] }],
      bn: [...manifesto.bn, { title: "নতুন বিভাগ", description: "বর্ণনা", points: ["পয়েন্ট ১"] }]
    };
    handleSave('MANIFESTO', updated);
  };

  // --- Biography Timeline Helpers ---
  const addMilestone = () => {
    const updated = {
      en: [...bio.en, { year: "2026", title: "New Achievement", description: "Details..." }],
      bn: [...bio.bn, { year: "২০২৬", title: "নতুন অর্জন", description: "বিস্তারিত..." }]
    };
    handleSave('BIO', updated);
  };

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "News", count: news.en.length, icon: <Newspaper className="text-green-700" />, color: "bg-green-50" },
          { label: "Manifesto", count: manifesto.en.length, icon: <Target className="text-red-600" />, color: "bg-red-50" },
          { label: "Volunteers", count: volunteers.length, icon: <Users className="text-blue-600" />, color: "bg-blue-50" },
          { label: "Admins", count: admins.length, icon: <ShieldCheck className="text-purple-600" />, color: "bg-purple-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className={`p-4 rounded-2xl ${stat.color}`}>{stat.icon}</div>
            <div>
               <div className="text-3xl font-black">{stat.count}</div>
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-700/10 rounded-full blur-[80px]"></div>
        <div className="flex justify-between items-start mb-10">
          <div>
            <h3 className="text-3xl font-bold mb-2">Home & Identity Editor</h3>
            <p className="text-slate-400">Manage the candidate's portrait and roles across the entire site.</p>
          </div>
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 rounded-3xl border-4 border-white/10 overflow-hidden bg-slate-800 shadow-2xl">
               <img src={profile.image} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={24} className="text-white" />
               </div>
            </div>
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, (url) => setProfile({...profile, image: url}))} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
           <div className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/5">
             <h4 className="font-black text-green-400 uppercase text-xs tracking-widest">English Global Text</h4>
             <div className="space-y-4">
                <input className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 font-bold" value={profile.name_en} onChange={(e) => setProfile({...profile, name_en: e.target.value})} placeholder="Name" />
                <input className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-sm" value={profile.role1_en} onChange={(e) => setProfile({...profile, role1_en: e.target.value})} placeholder="Role 1" />
                <textarea className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-sm h-24" value={profile.subtitle_en} onChange={(e) => setProfile({...profile, subtitle_en: e.target.value})} placeholder="Hero Subtitle" />
             </div>
           </div>
           <div className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/5">
             <h4 className="font-black text-red-400 uppercase text-xs tracking-widest">বাংলা গ্লোবাল টেক্সট</h4>
             <div className="space-y-4">
                <input className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 font-bold" value={profile.name_bn} onChange={(e) => setProfile({...profile, name_bn: e.target.value})} placeholder="নাম" />
                <input className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-sm" value={profile.role1_bn} onChange={(e) => setProfile({...profile, role1_bn: e.target.value})} placeholder="ভূমিকা ১" />
                <textarea className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-sm h-24" value={profile.subtitle_bn} onChange={(e) => setProfile({...profile, subtitle_bn: e.target.value})} placeholder="হিরো সাবটাইটেল" />
             </div>
           </div>
        </div>
        <button onClick={() => handleSave('PROFILE', profile)} className="bg-green-700 hover:bg-green-600 text-white px-12 py-4 rounded-2xl font-black flex items-center gap-3 transition-all shadow-xl">
          <Save size={24} /> Deploy Changes Application-Wide
        </button>
      </div>
    </div>
  );

  const renderNewsManager = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-black">Campaign Updates Engine</h3>
        <button onClick={addNews} className="bg-green-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-green-800 transition-all"><Plus size={20}/> Add New Update</button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {news.en.map((n: any, i: number) => (
          <div key={n.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 aspect-video md:aspect-square bg-slate-100 rounded-2xl overflow-hidden relative group">
               <img src={n.image} className="w-full h-full object-cover" />
               <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, (url) => {
                 const u = {...news}; u.en[i].image = url; u.bn[i].image = url; setNews(u); handleSave('NEWS', u);
               })} />
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-3">
                 <input className="w-full bg-slate-50 rounded-xl px-4 py-2 font-bold" value={n.title} onChange={(e) => { const u = {...news}; u.en[i].title = e.target.value; setNews(u); }} />
                 <textarea className="w-full bg-slate-50 rounded-xl px-4 py-2 text-xs h-20" value={n.excerpt} onChange={(e) => { const u = {...news}; u.en[i].excerpt = e.target.value; setNews(u); }} />
               </div>
               <div className="space-y-3">
                 <input className="w-full bg-slate-50 rounded-xl px-4 py-2 font-bold" value={news.bn[i].title} onChange={(e) => { const u = {...news}; u.bn[i].title = e.target.value; setNews(u); }} />
                 <textarea className="w-full bg-slate-50 rounded-xl px-4 py-2 text-xs h-20" value={news.bn[i].excerpt} onChange={(e) => { const u = {...news}; u.bn[i].excerpt = e.target.value; setNews(u); }} />
               </div>
            </div>
            <div className="flex flex-col gap-2">
               <button onClick={() => handleSave('NEWS', news)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"><Save size={20}/></button>
               <button onClick={() => deleteNews(n.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"><Trash2 size={20}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderManifestoManager = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-black">2026 Manifesto structured Editor</h3>
        <button onClick={addManifestoSector} className="bg-red-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2"><Plus size={20}/> Add Sector</button>
      </div>
      {manifesto.en.map((sec: any, i: number) => (
        <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
           <div className="grid grid-cols-2 gap-8">
             <div className="space-y-3">
               <input className="w-full text-xl font-bold border-b border-slate-100 py-2 outline-none focus:border-red-600" value={sec.title} onChange={(e) => { const u = {...manifesto}; u.en[i].title = e.target.value; setManifesto(u); }} />
               <textarea className="w-full text-sm text-slate-500 bg-slate-50 p-4 rounded-2xl h-24" value={sec.description} onChange={(e) => { const u = {...manifesto}; u.en[i].description = e.target.value; setManifesto(u); }} />
             </div>
             <div className="space-y-3">
               <input className="w-full text-xl font-bold border-b border-slate-100 py-2 outline-none focus:border-red-600" value={manifesto.bn[i].title} onChange={(e) => { const u = {...manifesto}; u.bn[i].title = e.target.value; setManifesto(u); }} />
               <textarea className="w-full text-sm text-slate-500 bg-slate-50 p-4 rounded-2xl h-24" value={manifesto.bn[i].description} onChange={(e) => { const u = {...manifesto}; u.bn[i].description = e.target.value; setManifesto(u); }} />
             </div>
           </div>
           <div className="pt-4 border-t border-slate-50 flex justify-end gap-3">
             <button onClick={() => {
                const u = {...manifesto}; u.en.splice(i, 1); u.bn.splice(i, 1); setManifesto(u); handleSave('MANIFESTO', u);
             }} className="text-red-600 font-bold text-sm px-4 py-2 bg-red-50 rounded-xl">Delete Sector</button>
             <button onClick={() => handleSave('MANIFESTO', manifesto)} className="bg-red-600 text-white px-8 py-2 rounded-xl font-bold">Save Sector</button>
           </div>
        </div>
      ))}
    </div>
  );

  const renderBioTimeline = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-black">Biography Timeline Manager</h3>
        <button onClick={addMilestone} className="bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2"><Plus size={20}/> Add Event</button>
      </div>
      <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-6">
        {bio.en.map((m: any, i: number) => (
          <div key={i} className="flex gap-6 items-start p-6 bg-slate-50 rounded-3xl border border-slate-100 group">
             <div className="w-24">
                <input className="w-full font-black text-center text-blue-700 bg-white border border-slate-200 rounded-xl py-2" value={m.year} onChange={(e) => { const u = {...bio}; u.en[i].year = e.target.value; u.bn[i].year = e.target.value; setBio(u); }} />
             </div>
             <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <input className="w-full font-bold bg-white border-none px-2 py-1 text-sm" value={m.title} onChange={(e) => { const u = {...bio}; u.en[i].title = e.target.value; setBio(u); }} />
                   <textarea className="w-full text-xs bg-white border-none px-2 py-1 h-16" value={m.description} onChange={(e) => { const u = {...bio}; u.en[i].description = e.target.value; setBio(u); }} />
                </div>
                <div className="space-y-2">
                   <input className="w-full font-bold bg-white border-none px-2 py-1 text-sm" value={bio.bn[i].title} onChange={(e) => { const u = {...bio}; u.bn[i].title = e.target.value; setBio(u); }} />
                   <textarea className="w-full text-xs bg-white border-none px-2 py-1 h-16" value={bio.bn[i].description} onChange={(e) => { const u = {...bio}; u.bn[i].description = e.target.value; setBio(u); }} />
                </div>
             </div>
             <button onClick={() => {
                const u = {...bio}; u.en.splice(i, 1); u.bn.splice(i, 1); setBio(u); handleSave('BIO', u);
             }} className="p-3 bg-red-50 text-red-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={18}/></button>
          </div>
        ))}
        <div className="flex justify-end pt-6">
          <button onClick={() => handleSave('BIO', bio)} className="bg-blue-700 text-white px-10 py-4 rounded-2xl font-black shadow-lg">Save Biography Updates</button>
        </div>
      </div>
    </div>
  );

  const renderSupportManager = () => (
    <div className="space-y-8">
       <h3 className="text-2xl font-black">Support Page & Financials</h3>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
             <h4 className="font-bold text-red-600 flex items-center gap-2"><Briefcase size={20}/> Donation Details</h4>
             <div className="space-y-4">
                <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold" value={support.bank_account} onChange={(e) => setSupport({...support, bank_account: e.target.value})} placeholder="Bank Title" />
                <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-mono" value={support.bank_number} onChange={(e) => setSupport({...support, bank_number: e.target.value})} placeholder="Account Details" />
             </div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
             <h4 className="font-bold text-green-700 flex items-center gap-2"><Rocket size={20}/> Volunteer Roles</h4>
             {support.volunteer_roles.map((role: any, i: number) => (
                <div key={i} className="flex gap-4">
                   <input className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs" value={role.title_en} onChange={(e) => { const u = {...support}; u.volunteer_roles[i].title_en = e.target.value; setSupport(u); }} />
                   <input className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs" value={role.title_bn} onChange={(e) => { const u = {...support}; u.volunteer_roles[i].title_bn = e.target.value; setSupport(u); }} />
                </div>
             ))}
          </div>
       </div>
       <div className="flex justify-center">
          <button onClick={() => handleSave('SUPPORT_CONFIG', support)} className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black shadow-xl">Update Support Page Settings</button>
       </div>
    </div>
  );

  const getActiveTabTitle = () => {
    switch (activeTab) {
      case 'overview': return "Dashboard Overview";
      case 'news': return "Campaign Chronicle News";
      case 'manifesto': return "Development Manifesto";
      case 'bio': return "Biography & Career";
      case 'vision2030': return "Vision 2030 Roadmap";
      case 'youth': return "Youth Vision Settings";
      case 'suggestions': return "Voter Opinions";
      case 'volunteers': return "Campaign Volunteers";
      case 'support': return "Support Us Settings";
      case 'settings': return "Admin Access Control";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <div className="w-72 bg-slate-900 text-white p-8 flex flex-col fixed h-full shadow-2xl z-50">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-green-700 p-2.5 rounded-2xl shadow-lg ring-4 ring-green-900/30"><Settings size={28} /></div>
          <div className="flex flex-col">
             <span className="font-black text-xl tracking-tighter leading-none">CMS HUB</span>
             <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-1">Zainul Campaign</span>
          </div>
        </div>
        <nav className="space-y-2 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
          {[
            { id: 'overview', label: "Overview", icon: <LayoutDashboard size={18}/> },
            { id: 'news', label: "Updates/News", icon: <Newspaper size={18}/> },
            { id: 'vision2030', label: "Vision 2030", icon: <Flag size={18}/>, color: "text-red-400" },
            { id: 'youth', label: "Youth Vision", icon: <Rocket size={18}/>, color: "text-blue-400" },
            { id: 'manifesto', label: "Manifesto", icon: <Target size={18}/> },
            { id: 'bio', label: "Biography", icon: <UserCircle size={18}/> },
            { id: 'support', label: "Support Config", icon: <Heart size={18}/> },
            { id: 'volunteers', label: "Volunteers", icon: <Users size={18}/> },
            { id: 'suggestions', label: "Opinions", icon: <MessageSquare size={18}/> },
            { id: 'settings', label: "Access", icon: <Lock size={18}/> },
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-green-700 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <span className={activeTab === item.id ? '' : item.color}>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <div className="pt-8 border-t border-white/10 space-y-4">
          <button onClick={resetData} className="w-full flex items-center gap-3 px-5 py-3 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all text-xs font-black uppercase tracking-widest">
            <RefreshCcw size={16} /> Factory Reset
          </button>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-white bg-white/5 hover:bg-white/10 transition-all text-sm font-bold shadow-sm">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>
      <div className="ml-72 flex-1 p-12 min-h-screen">
        <header className="flex justify-between items-center mb-12 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{getActiveTabTitle()}</h1>
          </div>
          <div className="flex items-center gap-6">
            {saveStatus && (
                <div className="bg-green-700 text-white px-8 py-4 rounded-[2rem] flex items-center gap-3 animate-fade-in shadow-xl border border-green-600 ring-4 ring-green-50">
                  <CheckCircle2 size={24} /> <span className="font-bold">{saveStatus}</span>
                </div>
              )}
            <div className="flex items-center bg-slate-100 rounded-full p-1.5 border border-slate-200 shadow-inner">
                <button onClick={() => setLang('en')} className={`px-5 py-2 text-xs font-bold rounded-full transition-all ${lang === 'en' ? 'bg-white text-green-700 shadow-md' : 'text-slate-400'}`}>EN</button>
                <button onClick={() => setLang('bn')} className={`px-5 py-2 text-xs font-bold rounded-full transition-all ${lang === 'bn' ? 'bg-white text-green-700 shadow-md' : 'text-slate-400'}`}>বাংলা</button>
            </div>
          </div>
        </header>
        <main className="pb-24">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'news' && renderNewsManager()}
          {activeTab === 'vision2030' && <div className="p-10 bg-white rounded-3xl">Vision 2030 Content Manager coming soon...</div>}
          {activeTab === 'youth' && <div className="p-10 bg-white rounded-3xl">Youth Vision Content Manager coming soon...</div>}
          {activeTab === 'manifesto' && renderManifestoManager()}
          {activeTab === 'bio' && renderBioTimeline()}
          {activeTab === 'support' && renderSupportManager()}
          {activeTab === 'volunteers' && (
             <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="text-slate-400 text-xs font-black uppercase tracking-widest border-b border-slate-100">
                       <th className="pb-6 pl-4">Volunteer</th>
                       <th className="pb-6">Area / Station</th>
                       <th className="pb-6">Profession</th>
                       <th className="pb-6">Role</th>
                       <th className="pb-6 text-right pr-4">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                     {volunteers.map((v: any) => (
                       <tr key={v.id} className="hover:bg-slate-50/50 transition-colors group">
                         <td className="py-6 pl-4">
                           <div className="font-bold text-slate-900">{v.fullName}</div>
                           <div className="text-xs text-slate-400">{v.phone} • {v.email}</div>
                         </td>
                         <td className="py-6">
                            <div className="text-sm font-medium">{v.thana}, {v.union}</div>
                            <div className="text-xs text-blue-600 font-bold">{v.pollingStation}</div>
                         </td>
                         <td className="py-6 text-sm">
                            {v.profession}
                         </td>
                         <td className="py-6">
                            <span className="bg-blue-50 text-blue-700 text-[10px] px-2 py-1 rounded-md font-bold border border-blue-100 uppercase">{v.role}</span>
                         </td>
                         <td className="py-6 text-right pr-4">
                            <button onClick={() => {
                               const updated = volunteers.filter(item => item.id !== v.id);
                               setVolunteers(updated); handleSave('VOLUNTEERS', updated);
                            }} className="p-2 text-slate-300 hover:text-red-600 transition-colors"><Trash2 size={18}/></button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          )}
          {activeTab === 'suggestions' && (
            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="text-slate-400 text-xs font-black uppercase tracking-widest border-b border-slate-100">
                       <th className="pb-6 pl-4">Voter</th>
                       <th className="pb-6">Location</th>
                       <th className="pb-6">Category</th>
                       <th className="pb-6">Message</th>
                       <th className="pb-6 text-right pr-4">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                     {suggestions.map((s: any) => (
                       <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                         <td className="py-6 pl-4">
                           <div className="font-bold text-slate-900">{s.fullName}</div>
                           <div className="text-xs text-slate-400">{s.phone}</div>
                         </td>
                         <td className="py-6">
                            <div className="text-sm font-medium">{s.thana}</div>
                            <div className="text-xs text-slate-400">{s.union}</div>
                         </td>
                         <td className="py-6">
                            <span className="bg-green-50 text-green-700 text-[10px] px-2 py-1 rounded-md font-bold border border-green-100 uppercase">{s.category}</span>
                         </td>
                         <td className="py-6">
                            <p className="text-xs text-slate-600 line-clamp-2 max-w-xs">{s.suggestion}</p>
                         </td>
                         <td className="py-6 text-right pr-4">
                            <button onClick={() => {
                               const updated = suggestions.filter(item => item.id !== s.id);
                               setSuggestions(updated); handleSave('SUGGESTIONS', updated);
                            }} className="p-2 text-slate-300 hover:text-red-600 transition-colors"><Trash2 size={18}/></button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
               <h4 className="text-xl font-bold mb-8">System Admin Accounts</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {admins.map((a, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-2xl flex justify-between items-center">
                       <div>
                          <div className="font-black text-slate-900">{a.username}</div>
                          <div className="text-xs text-slate-400 uppercase tracking-widest">{a.role}</div>
                       </div>
                       <div className="flex gap-2">
                          <div className="text-[10px] bg-slate-200 px-2 py-1 rounded font-bold">Active</div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
