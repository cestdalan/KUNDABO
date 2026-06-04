import React, { useState, useEffect } from 'react';
import { Leaf, ShoppingBag, Menu, X, CalendarDays, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenBooking: () => void;
  view: string;
  setView: (view: string) => void;
}

export default function Navbar({ onOpenBooking, view, setView }: NavbarProps) {
  const { setIsCartOpen, cartCount } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.home'), href: '#home', key: 'Home' },
    { label: t('nav.services'), href: '#services', key: 'Services' },
    { label: t('nav.shop'), href: '#shop', key: 'Shop' },
    { label: t('nav.portfolio'), href: '#portfolio', key: 'Portfolio' },
    { label: t('nav.testimonials'), href: '#testimonials', key: 'Testimonials' },
    { label: t('nav.contact'), href: '#contact', key: 'Contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, key: string, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (key === 'Shop') {
      setView('shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view !== 'landing') {
      setView('landing');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          const yOffset = -85;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        const yOffset = -85;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-emerald-950/85 backdrop-blur-md border-b border-white/10 py-4 shadow-md'
          : 'bg-emerald-900/40 backdrop-blur-[6px] border-b border-white/5 py-5 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, 'Home', '#home')}
          className="flex items-center gap-2 group focus:outline-none"
        >
          <img 
            src="/logo_flower_only.png" 
            alt="Kundabo" 
            className="w-10 h-10 object-contain transition-transform group-hover:scale-105 duration-300"
          />
          <span className="font-heading text-2xl font-bold tracking-tight text-white">
            Kundabo
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isShopActive = link.key === 'Shop' && view === 'shop';
            return (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.key, link.href)}
                className={`text-sm font-semibold transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-white after:origin-right after:transition-transform after:duration-300 ${
                  isShopActive 
                    ? 'text-white after:scale-x-100' 
                    : 'text-white/80 hover:text-white after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/10 text-white/80 hover:text-white transition-all text-xs font-semibold cursor-pointer"
              aria-label="Change Language"
            >
              <Globe className="w-4 h-4 text-accent" />
              <span>{language === 'en' ? 'EN' : 'RW'}</span>
            </button>
            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-xl bg-emerald-950 border border-white/10 shadow-xl py-1 text-xs font-semibold text-white/80 z-50">
                <button
                  onClick={() => {
                    setLanguage('en');
                    setIsLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-between ${language === 'en' ? 'text-accent font-bold' : ''}`}
                >
                  <span>English</span>
                  {language === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                </button>
                <button
                  onClick={() => {
                    setLanguage('rw');
                    setIsLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-between ${language === 'rw' ? 'text-accent font-bold' : ''}`}
                >
                  <span>Kinyarwanda</span>
                  {language === 'rw' && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <button
            id="navbar-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/10 text-white/80 hover:text-white transition-all duration-250 cursor-pointer"
            aria-label={`Open shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-white text-[10px] font-extrabold flex items-center justify-center animate-bounce shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Book Consultation Button */}
          <button
            onClick={onOpenBooking}
            className="hidden lg:flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-emerald-950/10 hover:shadow-lg hover:translate-y-[-1px] active:translate-y-[1px]"
          >
            <CalendarDays className="w-4 h-4 text-accent" />
            {t('nav.book')}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 md:hidden rounded-xl border border-white/10 text-white/80 hover:text-white"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[73px] left-0 right-0 bg-emerald-950/95 backdrop-blur-md border-b border-white/10 shadow-lg animate-fade-in">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => {
              const isShopActive = link.key === 'Shop' && view === 'shop';
              return (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.key, link.href)}
                  className={`text-base font-semibold transition-colors py-2 text-left ${
                    isShopActive ? 'text-accent' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-primary/15"
            >
              <CalendarDays className="w-4.5 h-4.5 text-accent" />
              {t('nav.book')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
