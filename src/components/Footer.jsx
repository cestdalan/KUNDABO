import React, { useState } from 'react';
import { Leaf, Send, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
        {/* Brand Section */}
        <div className="md:col-span-5 space-y-6">
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center gap-2 group inline-block">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary transition-transform group-hover:scale-105 shadow-md shadow-accent/10">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight text-white">
              Verdant
            </span>
          </a>
          <p className="font-sans text-sm text-emerald-200/60 leading-relaxed font-light max-w-sm">
            Premium flower arrangements, fresh bouquets, designer vases, and rare houseplants delivered with eco-friendly care directly to your door.
          </p>
          <div className="flex gap-4">
            {[
              { 
                label: 'Instagram', 
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                )
              },
              { 
                label: 'Facebook', 
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                )
              },
              { 
                label: 'Twitter', 
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                  </svg>
                )
              },
              { 
                label: 'Pinterest', 
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 22a9 9 0 0 1-2.4-6.2c0-3.9 2.5-7.3 6.4-7.3 1.8 0 3.3.7 4.1 1.7.9 1.1.9 2.8.3 4.3-.6 1.4-1.8 2.8-3.4 2.8-.7 0-1.3-.4-1.2-1.1l.9-3.7c.3-1.1.1-2.2-.6-2.9-.6-.7-1.6-.9-2.4-.4-1.6.8-2 2.9-1.5 4.5.3 1 1 1.7.7 2.7-.4 1.7-1.8 3.5-1.3 5.6z"/>
                  </svg>
                )
              },
            ].map((social, idx) => (
              <a
                key={idx}
                href="#"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-200 hover:bg-accent hover:text-primary transition-all duration-200"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
            Explore
          </h4>
          <ul className="space-y-2.5 text-sm text-emerald-200/60 font-light">
            {[
              { label: 'Home', href: '#home' },
              { label: 'Services', href: '#services' },
              { label: 'Shop Store', href: '#shop' },
              { label: 'Portfolio', href: '#portfolio' },
              { label: 'Testimonials', href: '#testimonials' },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="hover:text-accent transition-colors duration-150"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
            Garden Gazette
          </h4>
          <p className="font-sans text-sm text-emerald-200/60 font-light">
            Subscribe to receive fresh bouquet arrangement tutorials, houseplant care tips, and exclusive boutique discounts.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="relative flex items-center mt-2">
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-emerald-200/30 text-xs focus:bg-white/10 focus:border-accent outline-none pr-10 transition-all font-sans"
                placeholder="nursery@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-1.5 p-2 rounded-lg bg-accent hover:bg-accent-light text-primary transition-all active:scale-95 cursor-pointer"
                aria-label="Subscribe email"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="p-3 bg-emerald-900/50 border border-accent/20 rounded-xl flex items-center gap-2 text-accent text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Subscription successful! Thank you.</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/40 gap-4">
        <p>© {new Date().getFullYear()} Verdant. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
