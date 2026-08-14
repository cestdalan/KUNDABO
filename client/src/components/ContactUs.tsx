import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Send, CheckCircle2, CreditCard, ShieldCheck, HelpCircle } from 'lucide-react';
import { trpc } from '../lib/trpc';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const createContact = trpc.contact.create.useMutation();

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
      address: 'KG 28 Ave, opposite Rugando Church, Kimihurura, Kigali, Rwanda (beside French School)',
      hours: '24/7',
    },
    {
      id: 3,
      name: 'Nyarutarama Heights Branch',
      address: 'KG 9 Ave, Zenith Plaza, Nyarutarama, Kigali, Rwanda',
      hours: '8am-10pm Daily, 10am-8pm Sun',
    },
    {
      id: 4,
      name: 'Kigali International Airport Branch',
      address: 'Departure Terminal Hall, Kanombe, Kigali, Rwanda',
      hours: '24/7',
    },
  ];

  const paymentMethods = [
    {
      name: 'MTN MoMo Pay',
      type: 'Mobile Money',
      detail: 'Dial *182*8# or pay in cart',
      color: '#FFCC00',
      textColor: '#003366',
      logoText: 'MoMo',
    },
    {
      name: 'Airtel Money',
      type: 'Mobile Money',
      detail: 'Dial *182# or pay in cart',
      color: '#E31837',
      textColor: '#FFFFFF',
      logoText: 'airtel',
    },
    {
      name: 'Cards & Online',
      type: 'Visa / Mastercard',
      detail: 'Secure debit and credit card systems',
      color: '#0A382A',
      textColor: '#FFFFFF',
      isIcon: true,
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await createContact.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      setIsSubmitting(false);
      setSubmitError('Your message could not be saved right now. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-28 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Image, Description & Payments */}
          <div className="lg:col-span-5 space-y-8 flex flex-col">
            
            {/* Main Image Card with Glass Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group w-full"
            >
              {/* Ambient gold/emerald glow in the background */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-accent to-primary rounded-[32px] blur-2xl opacity-15 group-hover:opacity-25 transition duration-500" />
              
              <div className="relative w-full rounded-[32px] overflow-hidden border border-white/50 shadow-xl shadow-emerald-950/10 flex aspect-[4/3] sm:aspect-[16/10] lg:aspect-square">
                <img
                  src="/contact_pool.jpg"
                  alt="Kigali Bouqs Flower Pool Kigali"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Glass overlay with elegant botanical typography overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl water-glass backdrop-blur-md flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1.5">
                    Creative Landscaping
                  </span>
                  <h4 className="font-heading text-lg sm:text-xl font-bold text-emerald-950 leading-tight">
                    design your garden with <span className="font-heading italic text-accent font-extrabold tracking-wide">Kigali Bouqs</span>
                  </h4>
                  <p className="font-sans text-[11px] text-emerald-900/60 mt-1 font-light leading-relaxed">
                    Elevating outdoor and indoor spaces across Kigali with lush gardens, custom water pools, and premium botanical designs.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Payment Methods Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 rounded-[32px] water-glass shadow-lg border border-white/50 space-y-5 text-left"
            >
              <div className="flex items-center justify-between border-b border-emerald-950/5 pb-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-emerald-950">Supported Payments</h3>
                  <p className="text-xs text-emerald-900/50 font-light mt-0.5">Quick & secure local checkout</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-950/60 bg-emerald-950/5 px-2.5 py-1 rounded-full border border-emerald-950/5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>SECURE</span>
                </div>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((pm, idx) => (
                  <div key={idx} className="flex gap-4 items-center bg-white/20 p-3 rounded-2xl border border-white/40 transition-all hover:bg-white/40">
                    {/* Logo Box */}
                    {pm.isIcon ? (
                      <div 
                        className="w-11 h-11 rounded-xl flex items-center justify-center shadow-inner shrink-0" 
                        style={{ backgroundColor: pm.color }}
                      >
                        <CreditCard className="w-5 h-5 text-accent" />
                      </div>
                    ) : (
                      <div 
                        className="w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-[11px] uppercase tracking-wider shadow-inner shrink-0 select-none" 
                        style={{ backgroundColor: pm.color, color: pm.textColor }}
                      >
                        {pm.logoText}
                      </div>
                    )}
                    
                    {/* Details */}
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-emerald-950">{pm.name}</h4>
                        <span className="text-[9px] font-semibold bg-emerald-950/5 px-2 py-0.5 rounded-full text-emerald-900/60">{pm.type}</span>
                      </div>
                      <p className="text-[10px] text-emerald-900/55 font-light mt-0.5">{pm.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-emerald-900/40 text-center font-light leading-snug">
                Mobile Money payments are available both online in our shopping cart checkout and at any of our branches.
              </div>
            </motion.div>

          </div>

          {/* Right Column: Contact Form & Branches Grid */}
          <div className="lg:col-span-7 space-y-10 text-left">
            
            {/* Header info */}
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full inline-block mb-3.5">
                Get In Touch
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight">
                Contact Us Today!
              </h2>
              <p className="font-sans text-sm sm:text-base text-emerald-900/60 leading-relaxed font-light mt-3">
                Have questions about our landscape designs, booking a garden consultation, or need help with a custom floral bouquet? Drop us a message below.
              </p>
            </div>

            {/* Interactive Form Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-8 rounded-[32px] water-glass shadow-lg border border-white/50 relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name input */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Jean Paul"
                          className="h-11 px-4 rounded-xl border border-emerald-900/10 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all text-xs font-sans text-emerald-950 bg-white/20 backdrop-blur-sm"
                        />
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="jp@gmail.com"
                          className="h-11 px-4 rounded-xl border border-emerald-900/10 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all text-xs font-sans text-emerald-950 bg-white/20 backdrop-blur-sm"
                        />
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                        Phone Number <span className="text-emerald-900/40 font-light">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+250 78X XXX XXX"
                        className="h-11 px-4 rounded-xl border border-emerald-900/10 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all text-xs font-sans text-emerald-950 bg-white/20 backdrop-blur-sm"
                      />
                    </div>

                    {/* Message textarea */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        placeholder="Tell us about your event, delivery, or custom garden design needs..."
                        className="p-4 rounded-xl border border-emerald-900/10 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all text-xs font-sans text-emerald-950 bg-white/20 backdrop-blur-sm resize-none"
                      />
                    </div>

                    {submitError && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{submitError}</p>}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/10 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 active:translate-y-[1px]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-accent" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2 max-w-sm">
                      <h4 className="font-heading text-xl font-bold text-emerald-950">Thank You, Murakoze!</h4>
                      <p className="font-sans text-xs text-emerald-900/60 leading-relaxed font-light">
                        Your message has been recorded for our Kigali team. We will review your details and respond by email or phone; automatic email delivery is enabled once the business SMTP account is configured.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2 bg-emerald-950/5 hover:bg-emerald-950/10 text-emerald-950 rounded-xl text-[10px] font-bold uppercase tracking-wider border border-emerald-950/5 transition-all cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Our Boutiques Accordion / Grid */}
            <div className="space-y-4">
              <h3 className="font-heading text-xl font-bold text-emerald-950">Our Kigali Boutique Locations</h3>
              <p className="text-xs text-emerald-900/50 font-light leading-relaxed">
                Stop by any of our showrooms in Kigali for direct consultations, viewing fresh flower arrivals, or choosing custom-crafted clay vases.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {branches.map((branch) => (
                  <div
                    key={branch.id}
                    className="p-5 rounded-2xl border border-emerald-950/5 bg-white/20 hover:border-accent/40 hover:bg-white/40 transition-all duration-300 flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <h4 className="font-heading text-xs font-bold text-emerald-950 mb-2">
                        {branch.name}
                      </h4>
                      <div className="flex gap-2 items-start text-[11px] text-emerald-900/60 mb-2 font-light leading-relaxed">
                        <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{branch.address}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center text-[10px] text-emerald-900/45 font-light pt-2 border-t border-emerald-950/5 mt-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-600/40 shrink-0" />
                      <span>{branch.hours}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
