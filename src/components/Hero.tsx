import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Leaf, Sprout, Flower2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onExploreShop: () => void;
}

export default function Hero({ onExploreShop }: HeroProps) {
  const { t } = useLanguage();

  const handleScrollToShop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onExploreShop) {
      onExploreShop();
      return;
    }
    const element = document.querySelector('#shop');
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat select-none"
          style={{ 
            backgroundImage: 'url("/garden_path.jpg")',
            backgroundAttachment: 'fixed'
          }}
          aria-label="Premium winding garden pathway"
        />
        {/* Soft, rich gradient overlay using theme emerald/green colors */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/45 md:bg-gradient-to-r md:from-primary md:via-primary/75 md:to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Text Area */}
        <div className="lg:col-span-7 text-left space-y-6 md:space-y-8 max-w-2xl">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span>{t('hero.badge')}</span>
          </motion.div>

          {/* Headline */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight"
            >
              Bring Nature's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-white">
                Elegance Indoors
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-emerald-100/80 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-lg"
            >
              {t('hero.desc')}
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#shop"
              onClick={handleScrollToShop}
              className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/10 font-bold text-sm tracking-wide transition-all flex items-center gap-2 group backdrop-blur-sm cursor-pointer"
            >
              {t('hero.explore')}
              <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* Floating Widgets Area */}
        <div className="lg:col-span-5 relative h-[360px] md:h-[450px] w-full flex items-center justify-center lg:justify-end">
          {/* Card 1: Bouquets */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute top-4 md:top-8 left-4 md:left-12 lg:-left-4 xl:left-8 z-10 w-48 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-3 animate-float-slow text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/25 flex items-center justify-center text-accent shrink-0">
              <Flower2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-accent/80 font-bold uppercase tracking-wider">Boutique</p>
              <h4 className="text-white text-sm font-semibold mt-0.5">Fresh Bouquets</h4>
              <p className="text-accent-light text-xs font-medium mt-0.5">From $35.00</p>
            </div>
          </motion.div>

          {/* Card 2: Vases */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 lg:-right-4 xl:right-8 z-20 w-48 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-3 animate-float-medium text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-400/25 flex items-center justify-center text-emerald-300 shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-emerald-300/80 font-bold uppercase tracking-wider">Pottery</p>
              <h4 className="text-white text-sm font-semibold mt-0.5">Designer Vases</h4>
              <p className="text-accent-light text-xs font-medium mt-0.5">Clay & Glass • $24</p>
            </div>
          </motion.div>

          {/* Card 3: Plants */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-4 md:bottom-8 left-8 md:left-24 lg:left-8 xl:left-20 z-10 w-48 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-3 animate-float-fast text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-accent/80 font-bold uppercase tracking-wider">Houseplants</p>
              <h4 className="text-white text-sm font-semibold mt-0.5">Peace Lilies</h4>
              <p className="text-accent-light text-xs font-medium mt-0.5">Best Seller • $45</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
