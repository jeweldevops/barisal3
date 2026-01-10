
import React, { useState } from 'react';
import { Menu, X, Bot, Globe } from 'lucide-react';
import { TRANSLATIONS, Language } from '../constants';
import BnpLogo from './BnpLogo';

interface NavbarProps {
  onNavigate?: (page: 'home' | 'vision' | 'biography' | 'updates' | 'ai-assistant' | 'support-us') => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const navLinks = [
    { name: t.nav.home, href: '#home', value: 'home' as const },
    { name: t.nav.vision, href: '#vision', value: 'vision' as const },
    { name: t.nav.biography, href: '#bio', value: 'biography' as const },
    { name: t.nav.updates, href: '#updates', value: 'updates' as const },
    { name: t.nav.ai, href: '#ai-assistant', value: 'ai-assistant' as const },
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(link.value);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate?.('home')}
          >
            <div className="bg-green-700 p-2 rounded-lg text-white group-hover:bg-green-800 transition-colors">
              <BnpLogo size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800 hidden md:block">
              {lang === 'en' ? 'Zainul Abedin' : 'জয়নুল আবেদীন'} <span className="text-red-600 font-bold">{lang === 'en' ? 'Barisal-3' : 'বরিশাল-৩'}</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link);
                }}
                className={`flex items-center gap-1.5 transition-colors font-medium text-sm lg:text-base ${
                  link.value === 'ai-assistant' 
                    ? 'text-green-700 font-bold bg-green-50 px-3 py-1 rounded-full border border-green-100' 
                    : 'text-slate-600 hover:text-green-700'
                }`}
              >
                {link.value === 'ai-assistant' && <Bot size={16} />}
                {link.name}
              </a>
            ))}
            
            {/* Language Toggle */}
            <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200">
              <button 
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'en' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-50'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('bn')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'bn' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-500'}`}
              >
                বাংলা
              </button>
            </div>

            <button 
              onClick={() => onNavigate?.('support-us')}
              className="bg-red-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-700 transition-all shadow-md"
            >
              {t.nav.support}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} className="p-2 text-slate-600 bg-slate-100 rounded-lg">
              <Globe size={20} />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link);
                }}
                className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-green-700 hover:bg-slate-50 rounded-md"
              >
                {link.name}
              </a>
            ))}
            <button onClick={() => onNavigate?.('support-us')} className="w-full mt-2 bg-red-600 text-white px-5 py-3 rounded-md font-semibold text-center">
              {t.nav.support}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
