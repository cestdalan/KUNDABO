import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, CheckCircle2, Leaf, Clock, MapPin } from 'lucide-react';

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Bespoke Floral Designs',
    date: '',
    timeSlot: 'Morning (9 AM - 12 PM)',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Bespoke Floral Designs',
      date: '',
      timeSlot: 'Morning (9 AM - 12 PM)',
      message: '',
    });
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-emerald-950/30 backdrop-blur-sm transition-opacity"
          />

          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            {/* Sliding Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="w-screen max-w-md water-glass-drawer flex flex-col h-full"
            >
              {/* Header branding band */}
              <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2 text-left">
                  <Leaf className="w-5 h-5 text-accent animate-pulse" />
                  <div>
                    <h3 className="font-heading text-base font-bold tracking-wide">Design Consultation</h3>
                    <p className="text-[10px] text-accent-light/80">Premium botanical styling & container design</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                  aria-label="Close booking modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form body - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 no-scrollbar text-left">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-emerald-900/60 uppercase tracking-wider mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-emerald-900/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-xs font-sans"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-emerald-900/60 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-emerald-900/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-xs font-sans"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-emerald-900/60 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-emerald-900/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-xs font-sans"
                        placeholder="(555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-emerald-900/60 uppercase tracking-wider mb-1.5">
                        Select Botanical Service
                      </label>
                      <select
                        className="w-full px-4 py-2.5 rounded-xl border border-emerald-900/10 focus:border-primary focus:ring-1 focus:ring-primary bg-white outline-none transition-all text-xs font-sans text-emerald-950 cursor-pointer"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option>Bespoke Floral Designs</option>
                        <option>Flower Bed Curation</option>
                        <option>Patio Container Styling</option>
                        <option>Houseplant Styling</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-emerald-900/60 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-secondary" /> Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-emerald-900/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-xs font-sans text-emerald-950"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-emerald-900/60 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-secondary" /> Preferred Time
                      </label>
                      <select
                        className="w-full px-4 py-2.5 rounded-xl border border-emerald-900/10 focus:border-primary focus:ring-1 focus:ring-primary bg-white outline-none transition-all text-xs font-sans text-emerald-950 cursor-pointer"
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      >
                        <option>Morning (9 AM - 12 PM)</option>
                        <option>Afternoon (1 PM - 4 PM)</option>
                        <option>Late Afternoon (4 PM - 6 PM)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-emerald-900/60 uppercase tracking-wider mb-1.5">
                        Details & Preferences
                      </label>
                      <textarea
                        rows="3"
                        className="w-full px-4 py-2.5 rounded-xl border border-emerald-900/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-xs font-sans resize-none"
                        placeholder="Tell us briefly about your aesthetic, goals, and any specific flowers, colors, or pot types you love..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <div className="pt-4 border-t border-emerald-900/5 flex flex-col gap-3">
                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-900/40">
                        <MapPin className="w-3 h-3 text-secondary" />
                        <span>Premium Botanical Services</span>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold transition-all shadow-md shadow-emerald-950/10"
                      >
                        Schedule Consultation
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent-light flex items-center justify-center mx-auto text-primary">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="font-heading text-xl font-bold text-primary">Consultation Booked!</h4>
                    <div className="max-w-md mx-auto text-xs text-emerald-900/70 space-y-2 leading-relaxed">
                      <p>
                        Thank you, <strong className="text-emerald-950">{formData.name}</strong>! We have received your booking request for a <strong>{formData.service}</strong> consultation.
                      </p>
                      <div className="text-xs text-emerald-900/60 bg-emerald-50 py-2 px-3.5 rounded-xl inline-block font-semibold">
                        {formData.date} at {formData.timeSlot}
                      </div>
                      <p className="pt-2">
                        A design specialist will contact you at <strong>{formData.phone}</strong> or <strong>{formData.email}</strong> within 24 business hours to confirm your styling details.
                      </p>
                    </div>
                    <div className="pt-6">
                      <button
                        onClick={handleReset}
                        className="px-6 py-2.5 rounded-xl border border-primary text-primary hover:bg-emerald-50 text-xs font-semibold transition-all"
                      >
                        Close Drawer
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
