import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Quote, Sparkles, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 0,
    name: 'Sophia Martinez',
    role: 'Event Director',
    company: 'Elegant Events',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    quote: "Verdant's bespoke floral arrangements transformed our grand ballroom into a botanical dream. Guests were absolutely spellbound by the fresh pastel palettes!",
    type: 'logo',
    logoBg: 'bg-emerald-800',
    logoText: 'ELEGANT EVENTS',
    rating: 5,
  },
  {
    id: 1,
    name: 'Marcus Chen',
    role: 'Homeowner',
    company: 'YOU',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    quote: "The flower bed curation service was worth every penny. My front yard went from bare soil to a lush, colorful tulip oasis that blooms beautifully every season.",
    type: 'you',
    logoBg: 'bg-blue-600',
    logoText: 'YOU',
    rating: 5,
  },
  {
    id: 2,
    name: 'Elena Rostova',
    role: 'Interior Stylist',
    company: 'Rostova Designs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80&sat=-100', // B&W
    quote: "Their ribbed terracotta vases and houseplants added the perfect organic texture to our modern penthouse designs. Absolutely premium quality.",
    type: 'image',
    rating: 5,
  },
  {
    id: 3,
    name: 'David K.',
    role: 'Boutique Owner',
    company: 'K-Boutique',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80', // Sketch avatar
    quote: "Outstanding customer service and healthy plant delivery. Our Monstera arrived in pristine condition, and the brass trowel feels like an heirloom tool.",
    type: 'image',
    rating: 5,
  },
  {
    id: 4,
    name: 'Claire Dubois',
    role: 'Plant Enthusiast',
    company: 'Bloom Club',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80', // Color photo
    quote: "The monthly Gazette subscription has improved my plant care drastically. Their hand-tied bouquet boxes are my go-to gift for friends.",
    type: 'image',
    rating: 5,
  },
  {
    id: 5,
    name: 'Pacific Designs',
    role: 'Creative Partner',
    company: 'Pacific Designs',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80',
    quote: "Container styling has elevated our commercial patios significantly. The custom pottery choices and seasonal flower selections are unmatched.",
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

  // Map scroll value to horizontal translation of the track
  const trackX = useTransform(scrollYProgress, [0, 1], ["250px", "-450px"]);

  const [activeIndex, setActiveIndex] = useState(1); // Defaults to "YOU" (Index 1)

  // Map the scroll range to active index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.22) {
      setActiveIndex(0);
    } else if (latest >= 0.22 && latest < 0.38) {
      setActiveIndex(1);
    } else if (latest >= 0.38 && latest < 0.54) {
      setActiveIndex(2);
    } else if (latest >= 0.54 && latest < 0.70) {
      setActiveIndex(3);
    } else if (latest >= 0.70 && latest < 0.86) {
      setActiveIndex(4);
    } else {
      setActiveIndex(5);
    }
  });

  return (
    <section id="testimonials" ref={containerRef} className="py-24 bg-white relative overflow-hidden text-left">
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
          <div className="absolute left-[10%] md:left-[15%] top-[120px] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-blue-500/20 pointer-events-none flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-blue-500/40" />
          </div>

          {/* Sliding Track Container */}
          <motion.div style={{ x: trackX }} className="absolute inset-y-0 left-0 w-[1440px] flex items-center">
            
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
                        ? 'w-24 h-24 shadow-xl shadow-blue-500/20 z-20 scale-110 animate-none' 
                        : 'w-16 h-16 opacity-65 scale-90 animate-none'
                    }`}
                    onClick={() => setActiveIndex(node.id)}
                  >
                    {/* Active Double Ring Border */}
                    {isActive && (
                      <div className="absolute -inset-2.5 rounded-full border-2 border-blue-500 animate-pulse pointer-events-none" />
                    )}

                    {/* Node styling depending on type */}
                    {node.type === 'you' ? (
                      <div className="w-full h-full rounded-full bg-blue-600 border-[3px] border-white text-white font-heading text-sm font-extrabold flex items-center justify-center shadow-lg">
                        {node.logoText}
                      </div>
                    ) : node.type === 'logo' ? (
                      <div className={`w-full h-full rounded-full ${node.logoBg} border-[3px] border-white text-white text-[9px] font-bold tracking-tighter uppercase px-2 text-center flex flex-col items-center justify-center shadow-md`}>
                        {node.logoText === 'P' ? (
                          <span className="text-xl font-heading font-black">P</span>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 mb-0.5 text-accent animate-pulse" />
                            <span className="leading-none scale-[0.85]">{node.logoText}</span>
                          </>
                        )}
                      </div>
                    ) : (
                      <img
                        src={node.avatar}
                        alt={node.name}
                        className="w-full h-full rounded-full border-[3px] border-white object-cover shadow-md"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Active Testimonial Message Container */}
        <div className="mt-8 max-w-3xl mx-auto bg-emerald-50/20 border border-emerald-900/5 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-sm relative z-10 min-h-[220px] flex flex-col justify-between">
          <div className="absolute top-6 right-8 text-emerald-950/5 pointer-events-none">
            <Quote className="w-16 h-16 rotate-180 fill-current" />
          </div>

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
      </div>
    </section>
  );
}
