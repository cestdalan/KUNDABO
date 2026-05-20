import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import Products from './components/Products';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import BookingModal from './components/BookingModal';
import ShopPage from './components/ShopPage';
import { useCart } from './context/CartContext';
import { Leaf } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [view, setView] = useState('landing'); // 'landing' | 'shop'
  const { notification } = useCart();

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  return (
    <div className="min-h-screen bg-brand-bg font-sans selection:bg-accent/30 selection:text-emerald-950">
      {/* Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} view={view} setView={setView} />

      {/* Main Sections */}
      <main>
        {view === 'landing' ? (
          <>
            {/* Hero Section */}
            <Hero onOpenBooking={handleOpenBooking} onExploreShop={() => setView('shop')} />

            {/* Landscaping Services Section */}
            <Services onOpenBooking={handleOpenBooking} />

            {/* Before & After Interactive Slider & Portfolio */}
            <BeforeAfter />

            {/* eCommerce Shop Section */}
            <Products onExploreShop={() => setView('shop')} />

            {/* Customer Testimonials Section */}
            <Testimonials />
          </>
        ) : (
          <ShopPage onBackToHome={() => setView('landing')} />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Booking Modal Consultation Form (Now acts as a right drawer) */}
      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />

      {/* Global In-memory Add-to-cart Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 left-6 z-50 animate-bounce">
          <div className="flex items-center gap-2.5 px-4.5 py-3 rounded-2xl bg-emerald-900 border border-emerald-800 text-white text-xs font-semibold shadow-xl shadow-emerald-950/20 backdrop-blur-md">
            <div className="w-5 h-5 rounded-lg bg-accent/20 flex items-center justify-center text-accent shrink-0">
              <Leaf className="w-3.5 h-3.5" />
            </div>
            <span>{notification}</span>
          </div>
        </div>
      )}
    </div>
  );
}
