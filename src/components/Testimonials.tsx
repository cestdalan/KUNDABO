import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { Quote, Sparkles, Star, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 0,
    name: 'Sophia Martinez',
    role: 'Event Director',
    company: 'Elegant Events',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    quote: "Kigali Bouqs' bespoke floral arrangements transformed our grand ballroom into a botanical dream. Guests were absolutely spellbound by the fresh pastel palettes!",
    type: 'logo',
    logoBg: 'bg-emerald-800',
    logoText: 'ELEGANT EVENTS',
    rating: 5,
  },
  {
    id: 1,
    name: 'You',
    role: 'Kigali Bouqs Customer',
    company: 'Your Space',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    quote: 'you are the next to post your feedback here ',
    type: 'you',
    logoBg: 'bg-secondary',
    logoText: 'YOU',
    rating: 5,
  },
  {
    id: 2,
    name: 'Elena Rostova',
    role: 'Interior Stylist',
    company: 'Rostova Designs',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80',
    quote: "Their ribbed terracotta vases and fresh peony bouquets added the perfect organic texture to our modern penthouse designs. Absolutely premium quality.",
    type: 'image',
    rating: 5,
  },
  {
    id: 3,
    name: 'David K.',
    role: 'Boutique Owner',
    company: 'K-Boutique',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    quote: "Outstanding customer service and healthy flowering plants delivery. Our peace lily arrived in pristine condition, and the amber glass vases are absolutely gorgeous.",
    type: 'image',
    rating: 5,
  },
  {
    id: 4,
    name: 'Claire Dubois',
    role: 'Plant Enthusiast',
    company: 'Bloom Club',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
    quote: "The monthly newsletter has improved my floral styling drastically. Their hand-tied bouquet boxes are my go-to gift for friends.",
    type: 'image',
    rating: 5,
  },
  {
    id: 5,
    name: 'Pacific Designs',
    role: 'Creative Partner',
    company: 'Pacific Designs',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80',
    quote: "Floral containers styling has elevated our commercial patios significantly. The custom floral arrangements and seasonal flower selections are unmatched.",
    type: 'logo',
    logoBg: 'bg-sky-600',
    logoText: 'P',
    rating: 5,
  }
];

export default function Testimonials() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [activeIndex, setActiveIndex] = useState(1); // Defaults to "YOU" (Index 1)
  const [isManualMode, setIsManualMode] = useState(false);
  
  // Track X begins centered for index 1
  const trackXValue = useMotionValue(110); 

  // Map the scroll range to active index and track X when not in manual mode
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isManualMode) return;

    let newIndex = 1;
    if (latest < 0.22) {
      newIndex = 0;
    } else if (latest >= 0.22 && latest < 0.38) {
      newIndex = 1;
    } else if (latest >= 0.38 && latest < 0.54) {
      newIndex = 2;
    } else if (latest >= 0.54 && latest < 0.70) {
      newIndex = 3;
    } else if (latest >= 0.70 && latest < 0.86) {
      newIndex = 4;
    } else {
      newIndex = 5;
    }

    setActiveIndex(newIndex);
    
    // Smoothly map current scrollYProgress to track coordinate
    const targetX = 250 - (latest * 700);
    trackXValue.set(targetX);
  });

  // Enable manual navigation
  const handleManualNavigate = (newIndex) => {
    setIsManualMode(true);
    setActiveIndex(newIndex);
    
    // Animate trackXValue smoothly to direct index offset coordinate
    const targetX = 250 - (newIndex * 140);
    animate(trackXValue, targetX, {
      type: 'spring',
      stiffness: 85,
      damping: 16
    });
  };

  // Reset back to page scroll drive
  const handleResetToAuto = () => {
    setIsManualMode(false);
    
    const latest = scrollYProgress.get();
    let newIndex = 1;
    if (latest < 0.22) newIndex = 0;
    else if (latest >= 0.22 && latest < 0.38) newIndex = 1;
    else if (latest >= 0.38 && latest < 0.54) newIndex = 2;
    else if (latest >= 0.54 && latest < 0.70) newIndex = 3;
    else if (latest >= 0.70 && latest < 0.86) newIndex = 4;
    else newIndex = 5;

    setActiveIndex(newIndex);
    
    const targetX = 250 - (latest * 700);
    animate(trackXValue, targetX, {
      type: 'spring',
      stiffness: 90,
      damping: 18
    });
  };

  return (
    <section id="testimonials" ref={containerRef} className="py-24 bg-transparent relative overflow-hidden text-left">
      
      {/* Floating Manual Mode Badge Indicator */}
      {isManualMode && (
        <div className="absolute top-4 right-4 md:right-12 z-20 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-950/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-white shadow-lg animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          <span>Manual Control</span>
          <button 
            onClick={handleResetToAuto} 
            className="p-1 rounded-full hover:bg-white/10 text-accent transition-colors flex items-center justify-center cursor-pointer ml-1"
            title="Reset to Auto-Scroll"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-emerald-950 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="font-sans text-sm sm:text-base text-emerald-900/60 font-light">
            Real stories from real people! See how our services have transformed their experiences.
          </p>
        </div>

        {/* Wavy Slider Track */}
        <div className="relative h-[240px] w-full mt-8 overflow-hidden select-none">
          {/* Static highlight zone double-rings on the left */}
          <div className="absolute left-[10%] md:left-[15%] top-[120px] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-accent/25 pointer-events-none flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-accent/40" />
          </div>

          {/* Sliding Track Container */}
          <motion.div style={{ x: trackXValue }} className="absolute inset-y-0 left-0 w-[1440px] flex items-center">
            
            {/* SVG Wavy dotted line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 240" fill="none">
              <path 
                d="M0,150 Q360,50 720,150 T1440,150" 
                stroke="#E2E8F0" 
                strokeWidth="2.5" 
                strokeDasharray="8 8" 
              />
            </svg>

            {/* Scattered Decorative Gray Dots */}
            <div className="absolute left-[120px] top-[180px] w-2.5 h-2.5 rounded-full bg-emerald-900/15" />
            <div className="absolute left-[450px] top-[80px] w-2 h-2 rounded-full bg-emerald-900/15" />
            <div className="absolute left-[900px] top-[100px] w-2 h-2 rounded-full bg-emerald-900/15" />
            <div className="absolute left-[1100px] top-[190px] w-2.5 h-2.5 rounded-full bg-emerald-900/15" />

            {/* Testimonial Nodes */}
            {TESTIMONIALS.map((node) => {
              const isActive = activeIndex === node.id;
              
              // Coordinates of each node on the Q-curve
              let topPos = '150px';
              let leftPos = '100px';
              
              if (node.id === 0) { leftPos = '100px'; topPos = '150px'; }
              else if (node.id === 1) { leftPos = '320px'; topPos = '95px'; }
              else if (node.id === 2) { leftPos = '540px'; topPos = '175px'; }
              else if (node.id === 3) { leftPos = '760px'; topPos = '140px'; }
              else if (node.id === 4) { leftPos = '980px'; topPos = '95px'; }
              else if (node.id === 5) { leftPos = '1200px'; topPos = '150px'; }

              return (
                <div
                  key={node.id}
                  style={{
                    position: 'absolute',
                    left: leftPos,
                    top: topPos,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="z-10 animate-none"
                >
                  <div
                    className={`relative rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer ${
                      isActive 
                        ? 'w-24 h-24 shadow-xl shadow-accent/25 z-20 scale-110 animate-none' 
                        : 'w-16 h-16 opacity-65 scale-90 animate-none'
                    }`}
                    onClick={() => handleManualNavigate(node.id)}
                  >
                    {/* Active Double Ring Border */}
                    {isActive && (
                      <div className="absolute -inset-2.5 rounded-full border-2 border-accent animate-pulse pointer-events-none" />
                    )}

                    {/* All nodes now render their real profile image */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-white shadow-md">
                      <img
                        src={node.avatar}
                        alt={node.name}
                        className="w-full h-full object-cover select-none"
                      />
                      {node.id === 1 && (
                        <div className="absolute inset-0 bg-secondary/15 flex items-center justify-center pointer-events-none" />
                      )}
                    </div>

                    {/* Small visual overlay label for the YOU profile to identify it */}
                    {node.id === 1 && (
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-accent text-secondary text-[8px] font-extrabold px-1.5 py-0.5 rounded-full border border-white uppercase tracking-wider shadow z-30">
                        YOU
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Active Testimonial Message Container */}
        <div className="mt-8 max-w-3xl mx-auto water-glass rounded-3xl p-8 md:p-10 shadow-sm relative z-10 min-h-[220px] flex flex-col justify-between">
          <div className="absolute top-6 right-8 text-emerald-950/5 pointer-events-none">
            <Quote className="w-16 h-16 rotate-180 fill-current" />
          </div>

          {/* Interactive Navigation Chevron Arrows */}
          <button
            onClick={() => handleManualNavigate((activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="absolute left-[-20px] md:left-[-25px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full water-glass border border-white/40 hover:border-accent/40 text-emerald-950 hover:text-accent shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer z-20"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => handleManualNavigate((activeIndex + 1) % TESTIMONIALS.length)}
            className="absolute right-[-20px] md:right-[-25px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full water-glass border border-white/40 hover:border-accent/40 text-emerald-950 hover:text-accent shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer z-20"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-6 text-left"
            >
              {/* Stars */}
              <div className="flex gap-0.5 text-amber-500">
                {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4.5 h-4.5 fill-current" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="font-sans text-base sm:text-lg text-emerald-950 font-light leading-relaxed italic">
                "{TESTIMONIALS[activeIndex].quote}"
              </p>

              {/* Author Footer */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-emerald-950/5">
                <img 
                  src={TESTIMONIALS[activeIndex].avatar} 
                  alt={TESTIMONIALS[activeIndex].name} 
                  className="w-10 h-10 rounded-full object-cover border border-emerald-900/10 shadow-sm"
                />
                <div>
                  <h4 className="font-heading text-sm font-bold text-emerald-950 leading-tight">
                    {TESTIMONIALS[activeIndex].name}
                  </h4>
                  <p className="text-xs text-emerald-900/50 font-medium mt-0.5">
                    {TESTIMONIALS[activeIndex].role} • {TESTIMONIALS[activeIndex].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Clicking Indicators Dots below the card */}
        <div className="flex justify-center gap-2.5 mt-8">
          {TESTIMONIALS.map((t) => (
            <button
              key={t.id}
              onClick={() => handleManualNavigate(t.id)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === t.id ? 'w-7 bg-accent shadow-sm' : 'w-2.5 bg-emerald-900/25 hover:bg-emerald-900/40'
              }`}
              aria-label={`Go to testimonial ${t.id + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
