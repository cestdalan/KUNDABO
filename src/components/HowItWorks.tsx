import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2, Rocket } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      id: 1,
      title: t('how.step1.title'),
      description: t('how.step1.desc'),
      icon: (
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800">
          <Lightbulb className="w-10 h-10 stroke-[1.5]" />
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-primary text-xs font-bold flex items-center justify-center shadow-md">
            1
          </span>
        </div>
      ),
    },
    {
      id: 2,
      title: t('how.step2.title'),
      description: t('how.step2.desc'),
      icon: (
        <div className="relative flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10 stroke-[2]" />
          </div>
          <span className="text-[10px] font-bold text-emerald-600 mt-2 tracking-wide uppercase">
            MTN MoMo / Card
          </span>
          <span className="absolute -top-1 right-2 w-6 h-6 rounded-full bg-accent text-primary text-xs font-bold flex items-center justify-center shadow-md">
            2
          </span>
        </div>
      ),
    },
    {
      id: 3,
      title: t('how.step3.title'),
      description: t('how.step3.desc'),
      icon: (
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800">
          <Rocket className="w-10 h-10 stroke-[1.5] transition-transform duration-500 group-hover:translate-y-[-6px] group-hover:translate-x-[6px]" />
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-primary text-xs font-bold flex items-center justify-center shadow-md">
            3
          </span>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full inline-block">
            {t('how.badge')}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight">
            {t('how.title')}
          </h2>
          <p className="font-sans text-sm sm:text-base text-emerald-900/60 leading-relaxed font-light">
            {t('how.desc')}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[1px] bg-emerald-900/10 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group flex flex-col items-center text-center p-8 rounded-3xl water-glass hover:border-accent/40 hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 hover:translate-y-[-4px]"
            >
              {/* Icon Container */}
              <div className="mb-6 flex justify-center h-28 items-center">
                {step.icon}
              </div>

              {/* Step Title */}
              <h3 className="font-heading text-xl font-bold text-emerald-950 mb-3 group-hover:text-primary transition-colors">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="font-sans text-sm text-emerald-900/65 leading-relaxed font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
