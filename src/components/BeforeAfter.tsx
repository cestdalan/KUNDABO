import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowLeftRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    title: 'Bespoke Spring Tulip Bed',
    category: 'Garden Beds',
    image: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=800&q=80',
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 2,
    title: 'Terracotta Container Patio',
    category: 'Vases & Decor',
    image: 'https://images.unsplash.com/photo-1508502547303-f99987594041?auto=format&fit=crop&w=800&q=80',
    gridClass: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 3,
    title: 'Fresh Rose & Eucalyptus',
    category: 'Floral Styling',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    gridClass: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 4,
    title: 'English Rose Nursery',
    category: 'Plants',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    gridClass: 'md:col-span-1 md:row-span-1',
  },
];

export default function BeforeAfter() {
  const { t } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full inline-block">
            {t('ba.badge')}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight">
            {t('ba.title')}
          </h2>
          <p className="font-sans text-sm sm:text-base text-emerald-900/60 font-light">
            {t('ba.desc')}
          </p>
        </div>

        {/* Interactive Comparison Slider */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden water-glass p-4 shadow-xl mb-20">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[320px] sm:h-[450px] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none"
          >
            {/* Before Image (Bottom) */}
            <div className="absolute inset-0 w-full h-full z-0">
              <img
                src="/garden_before.jpg"
                alt="Before decoration"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <span className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-xl bg-emerald-950/65 backdrop-blur-md text-[10px] font-bold text-emerald-200/70 border border-emerald-800/10 uppercase tracking-widest pointer-events-none select-none">
                Before Decoration
              </span>
            </div>

            {/* After Image (Top - Clipped by width) */}
            <div
              className="absolute inset-0 h-full overflow-hidden z-10"
              style={{ width: `${sliderPosition}%` }}
            >
              <div 
                className="absolute inset-0 w-[100vw] h-full" 
                style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
              >
                <img
                  src="/garden_after.jpg"
                  alt="After styling"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              </div>
              <span className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-xl bg-primary/70 backdrop-blur-md text-[10px] font-bold text-accent border border-emerald-800/10 uppercase tracking-widest pointer-events-none select-none">
                After Styling
              </span>
            </div>

            {/* Slider Line & Handle */}
            <div
              className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={(e) => {
                e.preventDefault();
                isDragging.current = true;
              }}
              onTouchStart={() => {
                isDragging.current = true;
              }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-xl border border-emerald-900/10 hover:scale-105 active:scale-95 transition-transform">
                <ArrowLeftRight className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Masonry Project Portfolio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]">
          {PORTFOLIO_PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className={`${project.gridClass} relative rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl border border-emerald-900/5`}
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Glassmorphic Overlay on Hover */}
              <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left pointer-events-none">
                <div className="bg-white/85 backdrop-blur-md p-4 rounded-2xl border border-white/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[9px] uppercase font-bold text-secondary tracking-widest">
                    {project.category}
                  </span>
                  <h4 className="font-heading text-base font-bold text-emerald-950 mt-0.5 flex items-center gap-1.5 justify-between">
                    {project.title}
                    <Eye className="w-4 h-4 text-emerald-900/40" />
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
