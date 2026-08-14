// Navigation direction: Kigali Bouqs keeps desktop navigation at the top while mobile navigation becomes a quiet, icon-only liquid-glass dock.
import React, { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowUp,
  Home as HomeIcon,
  Images,
  Leaf,
  MessageCircle,
  ShoppingBag,
  Store,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  view: string;
  setView: (view: string) => void;
}

const mobileIconMap: Record<string, LucideIcon> = {
  Home: HomeIcon,
  Services: Leaf,
  Shop: Store,
  Portfolio: Images,
  Contact: MessageCircle,
};

export default function Navbar({ view, setView }: NavbarProps) {
  const { setIsCartOpen, cartCount } = useCart();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      setIsScrolled(currentScrollY > 20);
      setShowBackToTop(currentScrollY > 420);

      if (currentScrollY <= 24) {
        setShowMobileNav(true);
      } else if (scrollDelta > 4) {
        setShowMobileNav(false);
      } else if (scrollDelta < -4) {
        setShowMobileNav(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.home'), href: '#home', key: 'Home' },
    { label: t('nav.services'), href: '#services', key: 'Services' },
    { label: t('nav.shop'), href: '#shop', key: 'Shop' },
    { label: t('nav.portfolio'), href: '#portfolio', key: 'Portfolio' },
    { label: t('nav.contact'), href: '#contact', key: 'Contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, key: string, href: string) => {
    e.preventDefault();

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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <header
        className={`hidden md:block fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-emerald-950/85 backdrop-blur-md border-b border-white/10 py-4 shadow-md'
            : 'bg-emerald-900/40 backdrop-blur-[6px] border-b border-white/5 py-5 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'Home', '#home')}
            className="flex items-center gap-2 group focus:outline-none"
          >
            <img
              src="/logo_flower_only.png"
              alt="Kigali Bouqs"
              className="w-12 h-12 object-contain transition-transform group-hover:scale-105 duration-300"
            />
            <span className="font-heading text-2xl font-bold tracking-tight text-white">
              Kigali Bouqs
            </span>
          </a>

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

          <div className="flex items-center gap-4">
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

          </div>
        </div>
      </header>

      <div className="md:hidden mobile-top-brand" aria-label="Kigali Bouqs">
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'Home', '#home')}
          className="mobile-top-brand__link"
        >
          <img src="/logo_flower_only.png" alt="Kigali Bouqs" className="mobile-top-brand__logo" />
          <span>Kigali Bouqs</span>
        </a>
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          aria-label={`Open shopping cart with ${cartCount} items`}
          className="mobile-top-brand__cart"
        >
          <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.9} />
          {cartCount > 0 && <span className="mobile-cart-badge">{cartCount}</span>}
        </button>
      </div>

      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className={`md:hidden mobile-back-to-top ${showMobileNav ? 'mobile-back-to-top--nav-visible' : 'mobile-back-to-top--nav-hidden'}`}
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2.1} />
        </button>
      )}

      <nav
        aria-label="Mobile navigation"
        className={`md:hidden mobile-bottom-nav ${showMobileNav ? 'mobile-bottom-nav--visible' : 'mobile-bottom-nav--hidden'}`}
      >
        {navLinks.map((link) => {
          const Icon = mobileIconMap[link.key];
          const isActive = link.key === 'Shop' ? view === 'shop' : false;
          return (
            <a
              key={link.key}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.key, link.href)}
              aria-label={link.label}
              className={`mobile-bottom-nav__item ${isActive ? 'mobile-bottom-nav__item--active' : ''}`}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
            </a>
          );
        })}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          aria-label={`Open shopping cart with ${cartCount} items`}
          className="mobile-bottom-nav__item relative"
        >
          <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.9} />
          {cartCount > 0 && <span className="mobile-cart-badge">{cartCount}</span>}
        </button>
      </nav>
    </>
  );
}
