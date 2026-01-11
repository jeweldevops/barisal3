
import React, { useState } from 'react';
import { Language, TRANSLATIONS, getNewsUpdates, CANDIDATE_NAME } from '../constants';
import { ArrowLeft, Search, Filter, Calendar, MapPin, Share2, ChevronRight, Bell, Facebook, Twitter, MessageCircle, CheckCircle } from 'lucide-react';

interface UpdatesPageProps {
  onBack: () => void;
  lang: Language;
}

const UpdatesPage: React.FC<UpdatesPageProps> = ({ onBack, lang }) => {
  const t = TRANSLATIONS[lang];
  const allUpdates = getNewsUpdates(lang);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(lang === 'en' ? 'All' : 'সব');

  // Newsletter State
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const categories = lang === 'en' 
    ? ['All', 'Press Release', 'Community', 'Rallies', 'Legal Aid']
    : ['সব', 'প্রেস রিলিজ', 'সামাজিক', 'জনসভা', 'আইনি সহায়তা'];

  const filteredUpdates = allUpdates.filter(update => {
    const matchesSearch = update.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         update.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === categories[0] || update.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleShare = (platform: string, title: string) => {
    const url = window.location.href;
    const text = `${title} - Official Update from ${CANDIDATE_NAME}`;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    // Save to local storage
    const storageKey = 'campaign_newsletter_emails';
    const existingEmails = localStorage.getItem(storageKey);
    const emailsArray = existingEmails ? JSON.parse(existingEmails) : [];
    
    if (!emailsArray.includes(email)) {
      emailsArray.push(email);
      localStorage.setItem(storageKey, JSON.stringify(emailsArray));
    }

    setIsSubscribed(true);
    setEmail('');

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

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

        {/* Header Section */}
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-slate-100 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
              <Bell size={16} className="animate-bounce" /> {t.updates.badge}
            </h2>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              {lang === 'en' ? 'Campaign ' : 'ক্যাম্পেইন '}<span className="text-green-700">{lang === 'en' ? 'Chronicle' : 'ইতিবৃত্ত'}</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
              {t.updates.subtitle}
            </p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
                  activeCategory === cat 
                    ? 'bg-green-700 text-white shadow-lg' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-96">
            <input 
              type="text"
              placeholder={t.updates.search_placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>
        </div>

        {/* News Feed */}
        {filteredUpdates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUpdates.map((news) => (
              <div key={news.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 group flex flex-col h-full">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-6 left-6">
                    <div className="bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                      <Calendar size={12} /> {news.date}
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold text-green-700 uppercase tracking-wider bg-green-50 px-3 py-1 rounded-md border border-green-100">
                      {news.category}
                    </span>
                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                      <MapPin size={10} /> {lang === 'en' ? 'Barisal-3' : 'বরিশাল-৩'}
                    </span>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-green-700 transition-colors line-clamp-2 leading-tight">
                    {news.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {news.excerpt}
                  </p>

                  {/* Social Sharing Section */}
                  <div className="flex items-center gap-3 mb-8 pt-4 border-t border-slate-50">
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                      {lang === 'en' ? 'Share' : 'শেয়ার করুন'}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleShare('facebook', news.title)}
                        className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        title="Share on Facebook"
                      >
                        <Facebook size={14} />
                      </button>
                      <button 
                        onClick={() => handleShare('twitter', news.title)}
                        className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all shadow-sm"
                        title="Share on Twitter"
                      >
                        <Twitter size={14} />
                      </button>
                      <button 
                        onClick={() => handleShare('whatsapp', news.title)}
                        className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-green-600 hover:text-white transition-all shadow-sm"
                        title="Share on WhatsApp"
                      >
                        <MessageCircle size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <button className="text-red-600 font-bold text-sm flex items-center gap-1 group/btn hover:gap-3 transition-all">
                      {t.updates.read_more} <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.updates.no_results}</h3>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory(categories[0]); }}
              className="mt-8 text-green-700 font-bold hover:underline"
            >
              {t.updates.clear_filters}
            </button>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mt-20 bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-700/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">{t.updates.newsletter_title}</h3>
            <p className="text-slate-400 mb-10">{t.updates.newsletter_desc}</p>
            
            {isSubscribed ? (
              <div className="bg-green-700/20 border border-green-500/30 rounded-2xl p-6 flex items-center justify-center gap-3 animate-fade-in">
                <CheckCircle className="text-green-400" size={24} />
                <span className="font-bold text-green-400">
                  {lang === 'en' ? "Successfully subscribed!" : "সফলভাবে সাবস্ক্রাইব করা হয়েছে!"}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === 'en' ? "Enter your email" : "ইমেইল লিখুন"} 
                  className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-white placeholder:text-slate-500" 
                />
                <button 
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl active:scale-95"
                >
                  {t.updates.subscribe}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UpdatesPage;
