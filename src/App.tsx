import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ShopPage from './components/ShopPage';
import Carousel from './components/Carousel';
import ProductDetailPage from './components/ProductDetailPage';
import { useCart } from './context/CartContext';
import { Leaf } from 'lucide-react';

export default function App() {
  const [view, setView] = useState(() => {
    const saved = localStorage.getItem('kundabo_view');
    return (saved === 'shop' || saved === 'landing' || saved === 'product-detail') ? saved : 'landing';
  });
  const [selectedProduct, setSelectedProduct] = useState(() => {
    const saved = localStorage.getItem('kundabo_product');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [previousView, setPreviousView] = useState(() => {
    const saved = localStorage.getItem('kundabo_prev_view');
    return (saved === 'shop' || saved === 'landing') ? saved : 'landing';
  });
  const { notification } = useCart();

  useEffect(() => {
    localStorage.setItem('kundabo_view', view);
    localStorage.setItem('kundabo_prev_view', previousView);
    if (selectedProduct) {
      localStorage.setItem('kundabo_product', JSON.stringify(selectedProduct));
    } else {
      localStorage.removeItem('kundabo_product');
    }
  }, [view, selectedProduct, previousView]);

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
      <Navbar view={view} setView={setView} />

      {/* Main Sections */}
      <main>
        {view === 'landing' && (
          <>
            {/* Hero Section */}
            <Hero onExploreShop={() => setView('shop')} />
            <Carousel />

            {/* Landscaping Services Section */}
            <Services />

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
      <Footer view={view} setView={setView} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer setView={setView} />

      {/* Global in-memory add-to-cart notification */}
      {notification && (
        <div className="fixed top-[5.25rem] md:top-6 left-1/2 -translate-x-1/2 z-[90] w-[calc(100%-2rem)] max-w-sm animate-fade-in">
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
