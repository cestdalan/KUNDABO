import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import BookingModal from './components/BookingModal';
import ShopPage from './components/ShopPage';
import Carousel from './components/Carousel';
import ProductDetailPage from './components/ProductDetailPage';
import { useCart } from './context/CartContext';
import { Leaf } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [view, setView] = useState('landing'); // 'landing' | 'shop' | 'product-detail'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previousView, setPreviousView] = useState('landing');
  const { notification } = useCart();

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  const handleProductClick = (product) => {
    setPreviousView(view);
    setSelectedProduct(product);
    setView('product-detail');
  };

  const handleBackFromDetail = () => {
    setView(previousView);
  };

  return (
    <div className="min-h-screen bg-transparent font-sans selection:bg-accent/30 selection:text-emerald-950">
      {/* Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} view={view} setView={setView} />

      {/* Main Sections */}
      <main>
        {view === 'landing' && (
          <>
            {/* Hero Section */}
            <Hero onOpenBooking={handleOpenBooking} onExploreShop={() => setView('shop')} />
            <Carousel />

            {/* Landscaping Services Section */}
            <Services onOpenBooking={handleOpenBooking} />

            {/* Before & After Interactive Slider & Portfolio */}
            <BeforeAfter />

            {/* How It Works Section */}
            <HowItWorks />



            {/* Customer Testimonials Section */}
            <Testimonials />
            
            {/* Contact Us Today Section */}
            <ContactUs />
          </>
        )}

        {view === 'shop' && (
          <ShopPage onBackToHome={() => setView('landing')} onProductClick={handleProductClick} />
        )}

        {view === 'product-detail' && (
          <ProductDetailPage 
            product={selectedProduct} 
            onBack={handleBackFromDetail} 
            onProductClick={handleProductClick} 
          />
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
