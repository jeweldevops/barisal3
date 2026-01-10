
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Newspaper, 
  Target, 
  UserCircle, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  RefreshCcw,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronUp,
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  Fingerprint,
  Image as ImageIcon,
  Wand2,
  Loader2,
  Sparkles,
  Upload,
  Eye
} from 'lucide-react';
import { getData, saveData, resetData } from '../services/storageService';
import { generateCampaignImage, suggestImagePrompt } from '../services/geminiService';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'news' | 'manifesto' | 'bio' | 'settings'>('overview');
  const [news, setNews] = useState<any>(getData('NEWS'));
  const [manifesto, setManifesto] = useState<any>(getData('MANIFESTO'));
  const [bio, setBio] = useState<any>(getData('BIO'));
  const [profile, setProfile] = useState<any>(getData('PROFILE'));
  const [admins, setAdmins] = useState<any[]>(getData('ADMINS') || []);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // AI Image Gen State
  const [showImageGen, setShowImageGen] = useState(false);
  const [imageGenIdx, setImageGenIdx] = useState<number | null>(null);
  const [genPrompt, setGenPrompt] = useState('');
  const [isGenPromptLoading, setIsGenPromptLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [genImageUrl, setGenImageUrl] = useState<string | null>(null);

  // New admin state
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '', role: 'Admin' });
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);

  useEffect(() => {
    const session = localStorage.getItem('zainul_admin_session');
    if (session) {
      setCurrentAdmin(JSON.parse(session));
    }
    
    if (saveStatus) {
      const timer = setTimeout(() => setSaveStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  const handleSave = (key: 'NEWS' | 'MANIFESTO' | 'BIO' | 'PROFILE' | 'ADMINS', data: any) => {
    try {
      saveData(key, data);
      setSaveStatus('Changes saved successfully!');
      if (key === 'NEWS') setNews(data);
      if (key === 'MANIFESTO') setManifesto(data);
      if (key === 'BIO') setBio(data);
      if (key === 'PROFILE') setProfile(data);
      if (key === 'ADMINS') setAdmins(data);
    } catch (e) {
      alert("Storage limit exceeded. Please use shorter text or compress images.");
    }
  };

  const processImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit for localStorage safety
        alert("Image is too large. Please select an image under 1MB.");
        return;
      }
      const base64 = await processImageFile(file);
      callback(base64);
    }
  };

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.username || !newAdmin.password) return;
    if (admins.some(a => a.username === newAdmin.username)) {
      alert("Username already exists.");
      return;
    }
    const updated = [...admins, newAdmin];
    handleSave('ADMINS', updated);
    setNewAdmin({ username: '', password: '', role: 'Admin' });
  };

  const removeAdmin = (username: string) => {
    if (admins.length <= 1) {
      alert("At least one admin account must remain.");
      return;
    }
    if (username === currentAdmin?.username) {
      alert("You cannot remove your own account while logged in.");
      return;
    }
    const updated = admins.filter(a => a.username !== username);
    handleSave('ADMINS', updated);
  };

  const handleChangeOwnPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const newPass = (e.currentTarget.elements.namedItem('new_password') as HTMLInputElement).value;
    if (!newPass) return;
    
    const updatedAdmins = admins.map(a => 
      a.username === currentAdmin.username ? { ...a, password: newPass } : a
    );
    
    handleSave('ADMINS', updatedAdmins);
    alert("Password updated successfully.");
    (e.target as HTMLFormElement).reset();
  };

  const handleSuggestPrompt = async (idx: number) => {
    setIsGenPromptLoading(true);
    const item = news.en[idx];
    const suggestion = await suggestImagePrompt(item.title, item.excerpt);
    setGenPrompt(suggestion);
    setIsGenPromptLoading(false);
  };

  const handleGenerateImage = async () => {
    if (!genPrompt) return;
    setIsImageLoading(true);
    try {
      const url = await generateCampaignImage(genPrompt);
      setGenImageUrl(url);
    } catch (err) {
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsImageLoading(false);
    }
  };

  const applyGeneratedImage = () => {
    if (imageGenIdx === null || !genImageUrl) return;
    const nEn = [...news.en];
    const nBn = [...news.bn];
    nEn[imageGenIdx].image = genImageUrl;
    nBn[imageGenIdx].image = genImageUrl;
    setNews({ en: nEn, bn: nBn });
    setShowImageGen(false);
    setImageGenIdx(null);
    setGenImageUrl(null);
    setGenPrompt('');
  };

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <Newspaper className="text-green-700 mb-4" size={32} />
          <h3 className="text-3xl font-bold">{news.en.length}</h3>
          <p className="text-slate-500">Total Updates</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <Target className="text-red-600 mb-4" size={32} />
          <h3 className="text-3xl font-bold">{manifesto.en.length}</h3>
          <p className="text-slate-500">Manifesto Sectors</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <UserCircle className="text-blue-600 mb-4" size={32} />
          <h3 className="text-3xl font-bold">{bio.en.length}</h3>
          <p className="text-slate-500">Career Milestones</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <ShieldCheck className="text-purple-600 mb-4" size={32} />
          <h3 className="text-3xl font-bold">{admins.length}</h3>
          <p className="text-slate-500">Admin Users</p>
        </div>
      </div>
      
      <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-xl">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h3 className="text-2xl font-bold mb-2">Candidate Identity & Roles</h3>
            <p className="text-slate-400">Official profile data used across the hero section and footer.</p>
          </div>
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full border-4 border-green-700 overflow-hidden bg-slate-800">
               <img src={profile.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload size={20} />
               </div>
            </div>
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={(e) => handleFileUpload(e, (url) => setProfile({...profile, image: url}))}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-green-500 font-bold text-sm uppercase tracking-widest">English Identity</h4>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-500">Official Name</label>
              <input 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none" 
                value={profile.name_en}
                onChange={(e) => setProfile({...profile, name_en: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-500">Primary Role</label>
              <input 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none" 
                value={profile.role1_en}
                onChange={(e) => setProfile({...profile, role1_en: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-red-500 font-bold text-sm uppercase tracking-widest">Bengali Identity</h4>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-500">অফিসিয়াল নাম</label>
              <input 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none" 
                value={profile.name_bn}
                onChange={(e) => setProfile({...profile, name_bn: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-500">প্রথম ভূমিকা</label>
              <input 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none" 
                value={profile.role1_bn}
                onChange={(e) => setProfile({...profile, role1_bn: e.target.value})}
              />
            </div>
          </div>
        </div>
        <button 
          onClick={() => handleSave('PROFILE', profile)}
          className="mt-10 bg-green-700 hover:bg-green-600 text-white px-10 py-4 rounded-2xl font-bold transition-all flex items-center gap-3 shadow-xl"
        >
          <Save size={20} /> Update Official Profile
        </button>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col h-full">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <UserPlus className="text-green-700" /> Create New Admin User
          </h3>
          <form onSubmit={handleAddAdmin} className="space-y-6 flex-1">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Username</label>
              <input 
                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-700"
                value={newAdmin.username}
                onChange={e => setNewAdmin({...newAdmin, username: e.target.value})}
                placeholder="e.g. campaigner_1"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
              <input 
                type="password"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-700"
                value={newAdmin.password}
                onChange={e => setNewAdmin({...newAdmin, password: e.target.value})}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Role</label>
              <select 
                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-700 bg-white"
                value={newAdmin.role}
                onChange={e => setNewAdmin({...newAdmin, role: e.target.value})}
              >
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            <button className="w-full bg-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-800 transition-all shadow-md">
              <Plus size={20} /> Add User
            </button>
          </form>
        </div>

        <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 shadow-xl flex flex-col h-full">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Fingerprint className="text-green-500" /> Security Settings
          </h3>
          <div className="flex-1 space-y-8">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-sm text-slate-400 mb-1">Logged in as:</p>
              <h4 className="text-xl font-bold text-white">{currentAdmin?.username}</h4>
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest">{currentAdmin?.role}</span>
            </div>
            
            <form onSubmit={handleChangeOwnPassword} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Change My Password</label>
                <input 
                  name="new_password"
                  type="password"
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter new password"
                />
              </div>
              <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-500 transition-all">
                <Save size={20} /> Update My Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNewsManager = () => (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="text-xl font-bold">Campaign News Feed</h3>
        <button 
          onClick={() => {
            const newId = Date.now().toString();
            const newItemEn = { id: newId, date: 'Oct 30, 2023', title: 'New Campaign Update', excerpt: 'Brief description of the event...', image: 'https://picsum.photos/seed/'+newId+'/800/600', category: 'Community' };
            const newItemBn = { id: newId, date: '৩০ অক্টোবর, ২০২৩', title: 'নতুন নির্বাচনী আপডেট', excerpt: 'ইভেন্টের সংক্ষিপ্ত বর্ণনা...', image: 'https://picsum.photos/seed/'+newId+'/800/600', category: 'সামাজিক' };
            setNews({ en: [newItemEn, ...news.en], bn: [newItemBn, ...news.bn] });
          }}
          className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-all"
        >
          <Plus size={18} /> New Entry
        </button>
      </div>
      <div className="divide-y divide-slate-100">
        {news.en.map((item: any, idx: number) => (
          <div key={item.id} className="p-8 hover:bg-slate-50 transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-2 space-y-4">
                 <div className="relative group w-full aspect-square bg-slate-100 rounded-3xl overflow-hidden border border-slate-200">
                    <img src={item.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                       <Upload className="text-white" size={24} />
                       <span className="text-[10px] text-white font-bold uppercase">Upload</span>
                    </div>
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleFileUpload(e, (url) => {
                        const nEn = [...news.en]; const nBn = [...news.bn];
                        nEn[idx].image = url; nBn[idx].image = url;
                        setNews({en: nEn, bn: nBn});
                      })}
                    />
                 </div>
                 <button 
                  onClick={() => { setImageGenIdx(idx); setShowImageGen(true); }}
                  className="w-full bg-green-50 text-green-700 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-green-100 hover:bg-green-100 transition-all"
                 >
                   <Wand2 className="inline mr-1" size={12} /> AI Tool
                 </button>
              </div>
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold">EN</div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">English Content</span>
                </div>
                <input 
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-green-700 outline-none" 
                  placeholder="Article Title"
                  value={item.title} 
                  onChange={(e) => {
                    const newEn = [...news.en];
                    newEn[idx].title = e.target.value;
                    setNews({ ...news, en: newEn });
                  }}
                />
                <textarea 
                   className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs min-h-[100px] focus:ring-2 focus:ring-green-700 outline-none" 
                   placeholder="Short summary..."
                   value={item.excerpt}
                   onChange={(e) => {
                    const newEn = [...news.en];
                    newEn[idx].excerpt = e.target.value;
                    setNews({ ...news, en: newEn });
                  }}
                />
              </div>
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-red-50 rounded flex items-center justify-center text-[10px] font-bold text-red-600">BN</div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">বাংলা কন্টেন্ট</span>
                </div>
                <input 
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-red-600 outline-none" 
                  placeholder="নিবন্ধের শিরোনাম"
                  value={news.bn[idx].title} 
                  onChange={(e) => {
                    const newBn = [...news.bn];
                    newBn[idx].title = e.target.value;
                    setNews({ ...news, bn: newBn });
                  }}
                />
                <textarea 
                   className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs min-h-[100px] focus:ring-2 focus:ring-red-600 outline-none" 
                   placeholder="সংক্ষিপ্ত সারসংক্ষেপ..."
                   value={news.bn[idx].excerpt}
                   onChange={(e) => {
                    const newBn = [...news.bn];
                    newBn[idx].excerpt = e.target.value;
                    setNews({ ...news, bn: newBn });
                  }}
                />
              </div>
            </div>
            <div className="mt-8 flex flex-wrap justify-between items-center bg-slate-50/50 p-4 rounded-2xl border border-slate-100 gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-[300px]">
                <div className="text-xs text-slate-400 font-medium whitespace-nowrap">Image URL:</div>
                <input 
                  className="bg-transparent border-b border-slate-200 outline-none flex-1 text-xs font-mono" 
                  value={item.image.length > 50 ? item.image.substring(0, 50) + '...' : item.image} 
                  onChange={(e) => {
                    const nEn = [...news.en]; const nBn = [...news.bn];
                    nEn[idx].image = e.target.value; nBn[idx].image = e.target.value;
                    setNews({en: nEn, bn: nBn});
                  }} 
                />
              </div>
              <button 
                onClick={() => {
                  const newEn = news.en.filter((_: any, i: number) => i !== idx);
                  const newBn = news.bn.filter((_: any, i: number) => i !== idx);
                  setNews({ en: newEn, bn: newBn });
                }}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors flex items-center gap-2 ml-auto"
              >
                <Trash2 size={14} /> Delete Update
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-10 bg-slate-50 border-t border-slate-100 flex justify-end">
        <button 
          onClick={() => handleSave('NEWS', news)}
          className="bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg transition-all"
        >
          <Save size={20} /> Deploy News Updates
        </button>
      </div>

      {showImageGen && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[200] flex items-center justify-center p-6">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 max-w-4xl w-full shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
            <button onClick={() => { setShowImageGen(false); setImageGenIdx(null); setGenImageUrl(null); }} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900"><X size={32}/></button>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-green-700 p-3 rounded-2xl text-white shadow-lg"><Wand2 size={24} /></div>
              <div>
                <h3 className="text-3xl font-bold">AI Image Generator</h3>
                <p className="text-slate-500 font-medium">Create custom visual content for your update.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 overflow-y-auto pr-2">
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-black uppercase text-slate-400 tracking-widest">Image Prompt</label>
                    <button onClick={() => handleSuggestPrompt(imageGenIdx!)} disabled={isGenPromptLoading} className="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                      {isGenPromptLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />} 
                      Suggest Prompt
                    </button>
                  </div>
                  <textarea className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm h-32 focus:ring-2 focus:ring-green-700 outline-none resize-none shadow-inner" value={genPrompt} onChange={(e) => setGenPrompt(e.target.value)} placeholder="Describe the image you want to generate..." />
                  <button onClick={handleGenerateImage} disabled={!genPrompt || isImageLoading} className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isImageLoading ? <Loader2 size={20} className="animate-spin" /> : <Wand2 size={20} />} 
                    Generate Campaign Visual
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">Preview & Application</label>
                <div className="flex-1 bg-slate-100 rounded-[2rem] border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden min-h-[250px] relative shadow-inner">
                  {isImageLoading ? (
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 size={48} className="animate-spin text-green-700" />
                      <p className="text-slate-500 font-bold animate-pulse text-sm">Crafting your visual...</p>
                    </div>
                  ) : genImageUrl ? (
                    <img src={genImageUrl} alt="Generated" className="w-full h-full object-cover animate-fade-in" />
                  ) : (
                    <div className="text-center p-8">
                      <ImageIcon size={48} className="mx-auto text-slate-300 mb-4" />
                      <p className="text-slate-400 font-medium">Your generated image will appear here.</p>
                    </div>
                  )}
                </div>
                <button onClick={applyGeneratedImage} disabled={!genImageUrl} className="w-full mt-6 bg-green-700 hover:bg-green-800 text-white font-bold py-5 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-20 disabled:grayscale">
                  <CheckCircle2 size={24} /> Use This Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderBioManager = () => (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-xl font-bold">Biography Timeline</h3>
        <button 
          onClick={() => {
            const newItemEn = { year: 'Year', title: 'Milestone Title', description: 'Description...', image: '' };
            const newItemBn = { year: 'বছর', title: 'মাইলফলক শিরোনাম', description: 'বর্ণনা...', image: '' };
            setBio({ en: [...bio.en, newItemEn], bn: [...bio.bn, newItemBn] });
          }}
          className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
        >
          <Plus size={16} /> Add Milestone
        </button>
      </div>
      <div className="p-8 space-y-8">
        {bio.en.map((item: any, idx: number) => (
          <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 relative group">
            <button onClick={() => { const newEn = bio.en.filter((_: any, i: number) => i !== idx); const newBn = bio.bn.filter((_: any, i: number) => i !== idx); setBio({ en: newEn, bn: newBn }); }} className="absolute -top-3 -right-3 w-8 h-8 bg-white text-red-600 rounded-full shadow-md flex items-center justify-center hover:bg-red-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10">
              <X size={16} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-2 space-y-3">
                 <div className="relative group aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200">
                    {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-slate-300"><ImageIcon size={32}/></div>}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <Upload className="text-white" size={20}/>
                    </div>
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleFileUpload(e, (url) => {
                        const nEn = [...bio.en]; const nBn = [...bio.bn];
                        nEn[idx].image = url; nBn[idx].image = url;
                        setBio({en: nEn, bn: nBn});
                      })}
                    />
                 </div>
                 <div className="text-[9px] text-center font-bold text-slate-400 uppercase">Milestone Image</div>
              </div>
              <div className="md:col-span-5 space-y-4">
                <input className="w-32 bg-white border border-slate-200 rounded-lg px-3 py-1 font-bold text-green-700" value={item.year} onChange={(e) => { const n = [...bio.en]; n[idx].year = e.target.value; setBio({...bio, en: n}); }} />
                <input className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 font-bold" value={item.title} onChange={(e) => { const n = [...bio.en]; n[idx].title = e.target.value; setBio({...bio, en: n}); }} />
                <textarea className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm h-20" value={item.description} onChange={(e) => { const n = [...bio.en]; n[idx].description = e.target.value; setBio({...bio, en: n}); }} />
              </div>
              <div className="md:col-span-5 space-y-4">
                <input className="w-32 bg-white border border-slate-200 rounded-lg px-3 py-1 font-bold text-red-600" value={bio.bn[idx].year} onChange={(e) => { const n = [...bio.bn]; n[idx].year = e.target.value; setBio({...bio, bn: n}); }} />
                <input className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 font-bold" value={bio.bn[idx].title} onChange={(e) => { const n = [...bio.bn]; n[idx].title = e.target.value; setBio({...bio, bn: n}); }} />
                <textarea className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm h-20" value={bio.bn[idx].description} onChange={(e) => { const n = [...bio.bn]; n[idx].description = e.target.value; setBio({...bio, bn: n}); }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
        <button onClick={() => handleSave('BIO', bio)} className="bg-green-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2">
          <Save size={18} /> Save Biography
        </button>
      </div>
    </div>
  );

  const renderManifestoManager = () => (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-xl font-bold">Election Manifesto (5 Sectors)</h3>
      </div>
      <div className="p-8 space-y-12">
        {manifesto.en.map((sector: any, idx: number) => (
          <div key={idx} className="p-8 border-2 border-slate-100 rounded-[2.5rem] space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-black text-slate-900 border-b-2 border-red-500 w-fit pb-1">Sector {idx + 1}</h4>
              <div className="flex items-center gap-4">
                 <div className="relative group w-32 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    {sector.image ? <img src={sector.image} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-slate-300"><ImageIcon size={20}/></div>}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <Upload className="text-white" size={16}/>
                    </div>
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleFileUpload(e, (url) => {
                        const nEn = [...manifesto.en]; const nBn = [...manifesto.bn];
                        nEn[idx].image = url; nBn[idx].image = url;
                        setManifesto({en: nEn, bn: nBn});
                      })}
                    />
                 </div>
                 <span className="text-[10px] font-black uppercase text-slate-400">Sector Visual</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-slate-400">English Details</p>
                <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold" value={sector.title} onChange={(e) => { const n = [...manifesto.en]; n[idx].title = e.target.value; setManifesto({...manifesto, en: n}); }} />
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm h-24" value={sector.description} onChange={(e) => { const n = [...manifesto.en]; n[idx].description = e.target.value; setManifesto({...manifesto, en: n}); }} />
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400">Bullet Points</p>
                  {sector.points.map((p: string, pIdx: number) => (
                    <input key={pIdx} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs" value={p} onChange={(e) => { const n = [...manifesto.en]; n[idx].points[pIdx] = e.target.value; setManifesto({...manifesto, en: n}); }} />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-slate-400">বাংলা বিবরণ</p>
                <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold" value={manifesto.bn[idx].title} onChange={(e) => { const n = [...manifesto.bn]; n[idx].title = e.target.value; setManifesto({...manifesto, bn: n}); }} />
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm h-24" value={manifesto.bn[idx].description} onChange={(e) => { const n = [...manifesto.bn]; n[idx].description = e.target.value; setManifesto({...manifesto, bn: n}); }} />
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400">পয়েন্ট সমূহ</p>
                  {manifesto.bn[idx].points.map((p: string, pIdx: number) => (
                    <input key={pIdx} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs" value={p} onChange={(e) => { const n = [...manifesto.bn]; n[idx].points[pIdx] = e.target.value; setManifesto({...manifesto, bn: n}); }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
        <button onClick={() => handleSave('MANIFESTO', manifesto)} className="bg-green-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2">
          <Save size={18} /> Update Manifesto
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <div className="w-72 bg-slate-900 text-white p-8 flex flex-col fixed h-full shadow-2xl z-50">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-green-700 p-2.5 rounded-2xl shadow-lg ring-4 ring-green-900/30"><Settings size={28} /></div>
          <div className="flex flex-col">
             <span className="font-black text-xl tracking-tighter leading-none">CMS HUB</span>
             <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-1">Campaign Center</span>
          </div>
        </div>
        <nav className="space-y-3 flex-1">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all ${activeTab === 'overview' ? 'bg-green-700 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <LayoutDashboard size={20} /> Overview
          </button>
          <button onClick={() => setActiveTab('news')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all ${activeTab === 'news' ? 'bg-green-700 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Newspaper size={20} /> News Feed
          </button>
          <button onClick={() => setActiveTab('manifesto')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all ${activeTab === 'manifesto' ? 'bg-green-700 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Target size={20} /> Manifesto
          </button>
          <button onClick={() => setActiveTab('bio')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all ${activeTab === 'bio' ? 'bg-green-700 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <UserCircle size={20} /> Biography
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all ${activeTab === 'settings' ? 'bg-green-700 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Lock size={20} /> Account Access
          </button>
        </nav>
        <div className="pt-8 border-t border-white/10 space-y-4">
          <div className="px-5 py-4 bg-white/5 rounded-2xl flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-[10px] font-bold">{currentAdmin?.username?.charAt(0).toUpperCase()}</div>
             <div className="flex flex-col">
                <span className="text-xs font-bold">{currentAdmin?.username}</span>
                <span className="text-[10px] text-slate-500">{currentAdmin?.role}</span>
             </div>
          </div>
          <button onClick={resetData} className="w-full flex items-center gap-3 px-5 py-3 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all text-xs font-black uppercase tracking-widest">
            <RefreshCcw size={16} /> Factory Reset
          </button>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-white bg-white/5 hover:bg-white/10 transition-all text-sm font-bold shadow-sm">
            <LogOut size={18} /> Exit Admin
          </button>
        </div>
      </div>
      <div className="ml-72 flex-1 p-12 min-h-screen">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 capitalize tracking-tight">{activeTab} Manager</h1>
            <p className="text-slate-500 font-medium mt-1">Official Campaign Management System for Advocate Zainul Abedin.</p>
          </div>
          <div className="flex items-center gap-4">
            {saveStatus && (
              <div className="bg-green-700 text-white px-8 py-4 rounded-[2rem] flex items-center gap-3 animate-fade-in shadow-2xl border border-green-600 ring-4 ring-green-100">
                <CheckCircle2 size={24} /> 
                <span className="font-bold">{saveStatus}</span>
              </div>
            )}
            <button 
              onClick={onLogout}
              className="bg-white border border-slate-200 text-red-600 p-4 rounded-2xl hover:bg-red-50 hover:border-red-200 transition-all shadow-sm flex items-center gap-2 font-bold"
              title="Logout"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>
        <main className="pb-24">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'news' && renderNewsManager()}
          {activeTab === 'manifesto' && renderManifestoManager()}
          {activeTab === 'bio' && renderBioManager()}
          {activeTab === 'settings' && renderSettings()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
