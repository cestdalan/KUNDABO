import React, { useState, useEffect } from 'react';
import { Leaf, ShoppingBag, Menu, X, CalendarDays } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenBooking, view, setView }) {
  const { setIsCartOpen, cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Shop', href: '#shop' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  const handleLinkClick = (e, label, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (label === 'Shop') {
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
          ? 'glassmorphism border-b border-emerald-900/5 py-4 shadow-sm'
          : 'bg-white/45 backdrop-blur-[6px] border-b border-emerald-900/5 py-5 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, 'Home', '#home')}
          className="flex items-center gap-2 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white transition-all group-hover:scale-105 shadow-md shadow-primary/20">
            <Leaf className="w-5 h-5 text-accent" />
          </div>
          <span className="font-heading text-2xl font-bold tracking-tight text-emerald-950">
            Verdant
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isShopActive = link.label === 'Shop' && view === 'shop';
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.label, link.href)}
                className={`text-sm font-medium transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-primary after:origin-right after:transition-transform after:duration-300 ${
                  isShopActive 
                    ? 'text-primary after:scale-x-100' 
                    : 'text-emerald-900/70 hover:text-primary after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl border border-emerald-900/10 hover:border-primary/30 hover:bg-emerald-50/50 text-emerald-900/80 hover:text-primary transition-all duration-250 cursor-pointer"
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
            Book Consultation
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 md:hidden rounded-xl border border-emerald-900/10 text-emerald-900/80"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[73px] left-0 right-0 glassmorphism border-b border-emerald-900/5 shadow-lg animate-fade-in">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => {
              const isShopActive = link.label === 'Shop' && view === 'shop';
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.label, link.href)}
                  className={`text-base font-semibold transition-colors py-2 ${
                    isShopActive ? 'text-primary' : 'text-emerald-900/80 hover:text-primary'
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
              Book Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
