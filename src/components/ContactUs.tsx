import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';

export default function ContactUs() {
  const branches = [
    {
      id: 1,
      name: 'Kigali Head Office/Delivery Center',
      address: 'KG 7 Ave, Kigali Heights, Block B, 3rd Floor, Kimihurura, Kigali, Rwanda',
      hours: '24/7',
    },
    {
      id: 2,
      name: 'Kimihurura Garden Branch',
      address: 'KG 28 Ave, opposite Rugando Church, Kimihurura, Kigali, Rwanda (the White 3-story building, beside the French School)',
      hours: '24/7',
    },
    {
      id: 3,
      name: 'Nyarutarama Heights Branch',
      address: 'KG 9 Ave, Zenith Plaza, Nyarutarama, Kigali, Rwanda',
      hours: '8am-10pm (Everyday), 10am-8pm Sundays',
    },
    {
      id: 4,
      name: 'Kigali International Airport Branch',
      address: 'Departure Terminal Hall, Kanombe, Kigali, Rwanda',
      hours: '24/7',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Premium Interactive Mockup Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative group flex"
          >
            {/* Ambient gold glow in the background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-secondary rounded-[32px] blur-xl opacity-20 group-hover:opacity-30 transition duration-500" />
            
            <div className="relative w-full rounded-[32px] overflow-hidden border border-white/40 shadow-xl shadow-emerald-950/10 flex">
              <img
                src="https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=1000&q=80"
                alt="Kundabo Boutique Kigali"
                className="w-full h-full object-cover min-h-[400px] lg:min-h-full transition-transform duration-700 group-hover:scale-105"
              />
              {/* Glass overlay with elegant botanical typography overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl water-glass backdrop-blur-md flex flex-col justify-end">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1.5">
                  Visit Our Boutiques
                </span>
                <h4 className="font-heading text-xl font-bold text-emerald-950 leading-tight">
                  Kundabo Florists Kigali
                </h4>
                <p className="font-sans text-xs text-emerald-900/60 mt-1 font-light">
                  Step in and smell the roses, literally! Let our floral masters help you curate the perfect bouquet or green installation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Details & Branch Addresses */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col justify-center space-y-8 text-left"
          >
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full inline-block mb-3">
                Get In Touch
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight">
                Contact Us Today!
              </h2>
              <p className="font-sans text-sm text-emerald-900/60 leading-relaxed font-light mt-3">
                Reach out to our customer service team or visit one of our curated retail locations across Kigali.
              </p>
            </div>

            {/* Branches List */}
            <div className="space-y-6">
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className="p-5 rounded-2xl border border-emerald-950/5 hover:border-accent/30 hover:bg-white/30 transition-all duration-200"
                >
                  <h3 className="font-heading text-base font-bold text-emerald-950 mb-2">
                    {branch.name}
                  </h3>
                  
                  {/* Address */}
                  <div className="flex gap-2.5 items-start text-xs sm:text-sm text-emerald-900/60 mb-2 font-light">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-2.5 items-center text-xs sm:text-sm text-emerald-900/40 font-light">
                    <Clock className="w-4 h-4 text-emerald-600/40 shrink-0" />
                    <span>{branch.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
