import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Flower2, Lightbulb, Sprout, ArrowUpRight } from 'lucide-react';

export default function Services({ onOpenBooking }) {
  const servicesList = [
    {
      id: 'floral',
      title: 'Bespoke Floral Designs',
      description: 'Bespoke tablescapes, hand-tied bridal bouquets, and custom floral arrangements tailored for homes and premium corporate spaces.',
      icon: Flower2,
      highlight: 'Bespoke Styling',
    },
    {
      id: 'garden_beds',
      title: 'Flower Bed Curation',
      description: 'Custom landscape color plans matching soil conditions, sunlight exposure, and flower varieties for beautiful year-round blooms.',
      icon: Layers,
      highlight: 'Planting & Design',
    },
    {
      id: 'containers',
      title: 'Patio Container Styling',
      description: 'Curation of outdoor plants and shrubs paired with premium terracotta, ceramic, or self-watering decorative pots.',
      icon: Sprout,
      highlight: 'Pots & Vases',
    },
    {
      id: 'consultations',
      title: 'Houseplant Styling',
      description: 'Interior workspace foliage mapping, matching light parameters, water cycles, and pot designs with your home decor.',
      icon: Lightbulb,
      highlight: 'Expert Placement',
    },
  ];

  return (
    <section id="services" className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full inline-block">
            Botanical Services
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight">
            Floral Design & Garden Services
          </h2>
          <p className="font-sans text-sm sm:text-base text-emerald-900/60 leading-relaxed font-light">
            We help you bring nature into your home and patio with professional floral arrangements, container styling, and expert guidance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between p-8 rounded-3xl water-glass hover:border-accent/40 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-emerald-950/5"
              >
                {/* Accent Background Gradient Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-6 relative z-10">
                  {/* Icon and Highlight */}
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-white/40 border border-white/30 group-hover:bg-primary text-secondary group-hover:text-accent flex items-center justify-center transition-colors duration-300 backdrop-blur-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-900/40 group-hover:text-emerald-900/60 uppercase tracking-wider">
                      {service.highlight}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="font-heading text-lg font-bold text-emerald-950 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-emerald-900/50 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Card CTA Trigger */}
                <div className="pt-6 relative z-10">
                  <button
                    onClick={onOpenBooking}
                    className="flex items-center gap-1.5 text-xs font-bold text-secondary group-hover:text-primary transition-colors focus:outline-none"
                  >
                    <span>Book Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-[-0.5px]" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section Footer CTA */}
        <div className="mt-16 text-center">
          <p className="text-xs sm:text-sm text-emerald-900/50">
            Need custom event styling or regular planter service?{' '}
            <button
              onClick={onOpenBooking}
              className="text-secondary font-bold hover:text-primary underline underline-offset-4 decoration-accent focus:outline-none"
            >
              Contact our floral laboratory
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
