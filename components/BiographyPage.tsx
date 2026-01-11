
import React, { useEffect, useState } from 'react';
import { Language, TRANSLATIONS, CANDIDATE_IMAGE } from '../constants';
import { getData, saveData } from '../services/storageService';
import { ArrowLeft, Award, BookOpen, Gavel, History, Scale, Users, Heart, Star, Briefcase, Quote, Facebook, Twitter, MessageCircle, Share2, Landmark, Building2, Upload, Camera } from 'lucide-react';

interface BiographyPageProps {
  onBack: () => void;
  lang: Language;
  currentAdmin?: any;
}

const BiographyPage: React.FC<BiographyPageProps> = ({ onBack, lang, currentAdmin }) => {
  const t = TRANSLATIONS[lang];
  const [milestones, setMilestones] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(getData('PROFILE'));
  const [portrait, setPortrait] = useState<string>(profile?.image || CANDIDATE_IMAGE);

  useEffect(() => {
    const data = getData('BIO');
    if (data) {
      setMilestones(data[lang]);
    }
    const freshProfile = getData('PROFILE');
    if (freshProfile) {
      setProfile(freshProfile);
      setPortrait(freshProfile.image || CANDIDATE_IMAGE);
    }
  }, [lang]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("Image is too large. Please select an image under 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setPortrait(base64);
        const updatedProfile = { ...profile, image: base64 };
        setProfile(updatedProfile);
        saveData('PROFILE', updatedProfile);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const name = lang === 'en' ? profile.name_en : profile.name_bn;
    const text = lang === 'en' 
      ? `Learn about the life and legacy of ${name}, a voice of justice for Barisal-3.`
      : `${name}-এর জীবন ও আদর্শ সম্পর্কে জানুন - বরিশাল-৩ এর ন্যায়ের কণ্ঠস্বর।`;
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
      case 'x':
        shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="relative bg-slate-50 py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-slate-500 font-semibold mb-12 hover:text-green-700 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            {t.nav.back}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative w-full max-w-sm md:max-w-md mx-auto lg:mx-0">
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border-[12px] md:border-[16px] border-white bg-white ring-1 ring-slate-100 relative group transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]">
                  <img 
                    src={portrait} 
                    alt={lang === 'en' ? profile.name_en : profile.name_bn}
                    className="w-full h-full object-cover object-center scale-[1.02] transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {currentAdmin && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 transform -translate-y-4 group-hover:translate-y-0 transition-transform">
                        <Camera className="text-green-700" size={24} />
                        <span className="font-bold text-slate-900">{lang === 'en' ? 'Upload New Portrait' : 'নতুন ছবি আপলোড'}</span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] rounded-[1.8rem] md:rounded-[2rem] pointer-events-none"></div>
                </div>
                
                <div className="absolute -bottom-6 -right-4 md:-right-8 bg-green-700 text-white p-6 md:p-8 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(21,128,61,0.5)] border-4 border-white transform hover:scale-110 transition-all duration-300 z-20">
                  <div className="text-4xl md:text-5xl font-bold font-serif mb-1 leading-none">{lang === 'en' ? '35+' : '৩৫+'}</div>
                  <div className="text-xs md:text-sm uppercase tracking-widest font-black opacity-90">{t.bio.stat_years}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-800 text-sm font-bold mb-6">
                <Star size={16} fill="currentColor" />
                {t.bio.heading}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight font-serif">
                {lang === 'en' ? 'A Life Dedicated to ' : ''}<span className="text-red-600 underline decoration-red-100 underline-offset-8">{lang === 'en' ? 'Justice' : 'ন্যায়বিচারের জন্য উৎসর্গীকৃত জীবন'}</span>
              </h1>
              
              <div className="prose prose-lg text-slate-600 mb-10 max-w-none">
                <p className="font-bold text-xl text-slate-900 mb-4">{t.bio.subtitle}</p>
                <p className="leading-relaxed mb-4">{t.bio.detailed_bio}</p>
                <p className="leading-relaxed">{lang === 'en' 
                  ? "Senior Advocate Zainul Abedin's long and impactful career, marked by his leadership roles in the Bar Association and Bar Council, coupled with his extensive practice before the Supreme Court, solidifies his position as a key figure in the legal landscape of Bangladesh."
                  : "সিনিয়র এ্যাডভোকেট জয়নুল আবেদীনের দীর্ঘ ও প্রভাবশালী ক্যারিয়ার, বার অ্যাসোসিয়েশন এবং বার কাউন্সিলে তাঁর নেতৃত্বমূলক ভূমিকা এবং সুপ্রিম কোর্টে তাঁর ব্যাপক প্র্যাকটিস তাঁকে বাংলাদেশের আইনি অঙ্গনের অন্যতম প্রধান ব্যক্তিত্বে পরিণত করেছে।"}
                </p>
              </div>

              {/* Social Media Sharing Section */}
              <div className="flex flex-col gap-4 mb-10">
                <span className="text-sm font-black uppercase tracking-widest text-slate-400">
                  {lang === 'en' ? 'Share Biography' : 'জীবনী শেয়ার করুন'}
                </span>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => handleShare('facebook')} 
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all shadow-sm hover:-translate-y-1 font-bold text-sm"
                    title="Share on Facebook"
                  >
                    <Facebook size={18} /> Facebook
                  </button>
                  <button 
                    onClick={() => handleShare('x')} 
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm hover:-translate-y-1 font-bold text-sm"
                    title="Share on X"
                  >
                    <Twitter size={18} /> X / Twitter
                  </button>
                  <button 
                    onClick={() => handleShare('whatsapp')} 
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all shadow-sm hover:-translate-y-1 font-bold text-sm"
                    title="Share on WhatsApp"
                  >
                    <MessageCircle size={18} /> WhatsApp
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-4 items-start p-5 rounded-3xl bg-white border border-slate-100 shadow-sm">
                  <div className="bg-green-100 p-3 rounded-2xl text-green-700"><Landmark size={24}/></div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg leading-tight">{lang === 'en' ? 'Political' : 'রাজনৈতিক'}</h4>
                    <p className="text-slate-500 text-xs mt-1">{lang === 'en' ? profile.role1_en : profile.role1_bn}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-5 rounded-3xl bg-white border border-slate-100 shadow-sm">
                  <div className="bg-red-100 p-3 rounded-2xl text-red-700"><Gavel size={24}/></div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg leading-tight">{lang === 'en' ? 'Legal' : 'আইনি'}</h4>
                    <p className="text-slate-500 text-xs mt-1">{lang === 'en' ? profile.role2_en : profile.role2_bn}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-20 text-white mb-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-700/10 rounded-full blur-[100px]"></div>
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-green-700 rounded-2xl shadow-lg"><History size={32} /></div>
              <h2 className="text-4xl font-bold font-serif">{t.bio.chronicles}</h2>
            </div>
          </div>
          
          <div className="relative border-l-2 border-slate-700 ml-6 md:ml-12 space-y-16 py-4">
            {milestones.map((item, idx) => (
              <div key={idx} className="relative pl-12 group">
                <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-slate-900 border-4 border-green-600 group-hover:bg-green-600 transition-all duration-300 shadow-[0_0_15px_rgba(22,163,74,0.4)]"></div>
                <div className="text-green-500 font-bold text-lg mb-2 font-serif">{item.year}</div>
                <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors">{item.title}</h4>
                <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
          <div className="order-2 md:order-1">
             <h3 className="text-3xl font-bold text-slate-900 mb-6 font-serif">{t.bio.roots_title}</h3>
             <p className="text-lg text-slate-600 mb-8 leading-relaxed">{t.bio.roots_desc}</p>
             <ul className="space-y-4">
                {t.bio.personal_points.map((point: string, idx: number) => (
                  <li key={idx} className="flex gap-4 items-center">
                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                    <span className="text-slate-700 font-medium">{point}</span>
                  </li>
                ))}
             </ul>
          </div>
          <div className="order-1 md:order-2">
             <div className="aspect-video rounded-[2.5rem] bg-slate-100 overflow-hidden relative border border-slate-200 shadow-lg">
                <img src="https://images.unsplash.com/photo-1577416416142-f410de8daccf?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-80" alt="Roots" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiographyPage;
