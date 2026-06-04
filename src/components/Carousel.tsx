import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Tag } from 'lucide-react';

interface SlideItem {
  image: string;
  title: string;
  category: string;
  tag: string;
  price: string;
  description: string;
}

const CAROUSEL_SLIDES: SlideItem[] = [
  {
    image: '/red_roses_mesh_bouquet.jpg',
    title: 'Crimson Desire Premium Roses',
    category: 'Romantic Collection',
    tag: 'Best Seller',
    price: '$65.00',
    description: 'A classic declaration of passion and elegance. A full dozen long-stemmed crimson red roses wrapped in premium mesh and craft paper.',
  },
  {
    image: '/meadow_grass_bouquet.jpg',
    title: 'Spring Blossom Hand-Tied Bouquet',
    category: 'Vibrant Meadows',
    tag: 'Fresh Cut',
    price: '$49.99',
    description: 'A lively, custom-curated hand-tied bouquet of fresh field flowers, red daisies, and peach roses hand-bound with twine.',
  },
  {
    image: '/white_hydrangeas_bouquet.jpg',
    title: 'Maison Fleurus White Hydrangeas',
    category: 'Luxury Hydrangeas',
    tag: 'Parisian Style',
    price: '$42.00',
    description: 'An exquisite, luxury bouquet of pure white hydrangeas wrapped in signature Maison Fleurus craft paper.',
  },
  {
    image: '/vibrant_roses_bouquet.jpg',
    title: 'Vibrant Mixed Roses Bouquet',
    category: 'Garden Classics',
    tag: 'Fresh Arranged',
    price: '$55.00',
    description: 'A vibrant, romantic gathering of fresh pink and yellow roses mixed with alstroemeria and lush greenery.',
  }
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  const startSlideShow = () => {
    stopSlideShow();
    slideInterval.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4500); // 4.5s autoplay intervals
  };

  const stopSlideShow = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      startSlideShow();
    } else {
      stopSlideShow();
    }
    return () => stopSlideShow();
  }, [isHovered]);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white/20 to-emerald-50/10 relative overflow-hidden">
      {/* Decorative backdrop gradients for absolute premium look */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-900/5 text-[10px] font-bold text-secondary uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seasonal Treasures</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight">
            Get your flowers today
          </h2>
          <p className="font-sans text-sm text-emerald-900/50 max-w-lg mx-auto font-light">
            Bring life, fragrance, and curated aesthetic elegance straight to your home or special occasion.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative rounded-[32px] overflow-hidden shadow-2xl border border-emerald-900/5 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Slides Wrapper */}
          <div className="relative h-[480px] md:h-[520px] w-full overflow-hidden bg-emerald-950">
            <div
              className="flex h-full w-full transition-transform duration-1000 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {CAROUSEL_SLIDES.map((slide, i) => (
                <div key={i} className="w-full h-full flex-shrink-0 relative">
                  
                  {/* High Quality Image */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover select-none"
                  />

                  {/* Dark Elegant overlay for text readability and premium aesthetic */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-black/10" />

                  {/* Slide Content Card Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-left text-white flex flex-col justify-end min-h-[50%]">
                    <div className="max-w-3xl space-y-4">
                      
                      {/* Category and Tag */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-accent">
                          {slide.category}
                        </span>
                        {slide.tag && (
                          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[9px] font-bold uppercase tracking-wider border border-white/10 text-white/90">
                            <Tag className="w-3 h-3 text-accent" />
                            {slide.tag}
                          </span>
                        )}
                      </div>

                      {/* Title & Price */}
                      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                        <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                          {slide.title}
                        </h3>
                        <span className="font-heading text-xl sm:text-2xl font-bold text-accent shrink-0">
                          {slide.price}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="font-sans text-xs sm:text-sm text-white/70 max-w-2xl font-light leading-relaxed">
                        {slide.description}
                      </p>

                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls - Custom Glassmorphic Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 cursor-pointer shadow-lg z-20 focus:outline-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 cursor-pointer shadow-lg z-20 focus:outline-none"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicator Dots at bottom */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
            {CAROUSEL_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`transition-all duration-500 rounded-full focus:outline-none cursor-pointer ${
                  index === i 
                    ? 'w-8 h-2 bg-accent shadow-md shadow-accent/50' 
                    : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
