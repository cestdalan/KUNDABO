import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  setView?: (view: string) => void;
}

export default function CartDrawer({ setView }: CartDrawerProps) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    clearCart,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [shippingMethod, setShippingMethod] = useState('delivery'); // 'delivery' | 'pickup'
  const [paymentMethod, setPaymentMethod] = useState('momo'); // 'momo' | 'airtel' | 'card'
  const [momoNumber, setMomoNumber] = useState('');
  const [airtelNumber, setAirtelNumber] = useState('');

  const shippingCost = shippingMethod === 'delivery' ? (cartSubtotal > 150 ? 0 : 15.00) : 0;
  const estimatedTax = cartSubtotal * 0.0825; // 8.25% tax
  const totalCost = cartSubtotal + shippingCost + estimatedTax;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep('success');
  };

  const handleClose = () => {
    setIsCartOpen(false);
    // Reset checkout step on close so it resets if they reopen later
    setTimeout(() => {
      setCheckoutStep('cart');
      setPaymentMethod('momo');
      setMomoNumber('');
      setAirtelNumber('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
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
              {/* Header */}
              <div className="p-6 border-b border-emerald-900/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h3 className="font-heading text-lg font-bold text-primary">Your Garden Cart</h3>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-full hover:bg-emerald-50 text-emerald-900/60 transition-colors"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* In-Cart Notification Banner */}
              {cart.length > 0 && checkoutStep === 'cart' && (
                <div className="bg-emerald-50/80 px-6 py-2.5 border-b border-emerald-900/5 text-xs text-secondary flex items-center gap-1.5 justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
                  {cartSubtotal > 150 ? (
                    <span>Congratulations! You qualified for <strong>Free Shipping</strong>!</span>
                  ) : (
                    <span>Add <strong>${(150 - cartSubtotal).toFixed(2)}</strong> more for free shipping!</span>
                  )}
                </div>
              )}

              {/* Content Panel */}
              <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                {checkoutStep === 'cart' && (
                  <>
                    {cart.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800/40">
                          <ShoppingBag className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="font-heading text-lg font-bold text-emerald-950">Your cart is empty</p>
                          <p className="text-sm text-emerald-900/50 mt-1">Lush green spaces start with a single plant.</p>
                        </div>
                        <button
                          onClick={() => {
                            handleClose();
                            if (setView) setView('shop');
                          }}
                          className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-sm cursor-pointer"
                        >
                          Start Shopping
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-4 p-3 rounded-2xl border border-emerald-900/5 bg-emerald-50/20"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 rounded-xl object-cover border border-emerald-900/5"
                            />
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <span className="text-[10px] uppercase font-semibold text-emerald-900/40 tracking-wider">
                                  {item.category}
                                </span>
                                <h4 className="font-sans text-sm font-bold text-emerald-950 leading-tight">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-secondary font-medium mt-0.5">
                                  ${item.price.toFixed(2)}
                                </p>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center border border-emerald-900/10 rounded-lg bg-white overflow-hidden">
                                  <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="p-1 hover:bg-emerald-50 text-emerald-900/60"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="px-2 text-xs font-semibold text-emerald-950 min-w-[20px] text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="p-1 hover:bg-emerald-50 text-emerald-900/60"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-500 hover:text-red-600 p-1 transition-colors"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {checkoutStep === 'checkout' && (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <h4 className="font-heading text-base font-bold text-primary mb-3">Secure Checkout</h4>

                    {/* Shipping Method */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <label className={`flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${
                        shippingMethod === 'delivery' 
                          ? 'border-primary bg-emerald-50/30 text-primary' 
                          : 'border-emerald-900/10 bg-white text-emerald-900/60'
                      }`}>
                        <input 
                          type="radio" 
                          name="shipping" 
                          value="delivery" 
                          checked={shippingMethod === 'delivery'} 
                          onChange={() => setShippingMethod('delivery')}
                          className="sr-only"
                        />
                        <span className="text-xs font-semibold">Home Delivery</span>
                        <span className="text-[10px] mt-0.5">Free over $150</span>
                      </label>
                      <label className={`flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${
                        shippingMethod === 'pickup' 
                          ? 'border-primary bg-emerald-50/30 text-primary' 
                          : 'border-emerald-900/10 bg-white text-emerald-900/60'
                      }`}>
                        <input 
                          type="radio" 
                          name="shipping" 
                          value="pickup" 
                          checked={shippingMethod === 'pickup'} 
                          onChange={() => setShippingMethod('pickup')}
                          className="sr-only"
                        />
                        <span className="text-xs font-semibold">Nursery Pickup</span>
                        <span className="text-[10px] mt-0.5">Always Free</span>
                      </label>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-semibold text-emerald-900/50 uppercase tracking-wider mb-1">
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 rounded-xl border border-emerald-900/10 focus:border-primary outline-none text-xs"
                          placeholder="123 Eco Way, Plant Town"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-semibold text-emerald-900/50 uppercase tracking-wider mb-1">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-3 py-2 rounded-xl border border-emerald-900/10 focus:border-primary outline-none text-xs"
                            placeholder="90210"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-emerald-900/50 uppercase tracking-wider mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            required
                            className="w-full px-3 py-2 rounded-xl border border-emerald-900/10 focus:border-primary outline-none text-xs"
                            placeholder="(555) 555-5555"
                          />
                        </div>
                      </div>

                      {/* Payment Method Option Selector */}
                      <div className="pt-2 space-y-2">
                        <label className="block text-[10px] font-semibold text-emerald-900/50 uppercase tracking-wider">
                          Choose Payment Option
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {/* MTN MoMo */}
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('momo')}
                            className={`py-2 px-1 border rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              paymentMethod === 'momo'
                                ? 'border-[#FFCC00] bg-[#FFCC00]/5 text-[#003366] font-bold shadow-sm'
                                : 'border-emerald-900/10 bg-white/20 text-emerald-900/60 hover:bg-white/40'
                            }`}
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#FFCC00] flex items-center justify-center text-[#003366] font-extrabold text-[9px] select-none shadow-sm">
                              MoMo
                            </div>
                            <span className="text-[9px] truncate">MTN MoMo</span>
                          </button>

                          {/* Airtel Money */}
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('airtel')}
                            className={`py-2 px-1 border rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              paymentMethod === 'airtel'
                                ? 'border-[#E31837] bg-[#E31837]/5 text-[#E31837] font-bold shadow-sm'
                                : 'border-emerald-900/10 bg-white/20 text-emerald-900/60 hover:bg-white/40'
                            }`}
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#E31837] flex items-center justify-center text-white font-bold text-[9px] select-none shadow-sm">
                              airtel
                            </div>
                            <span className="text-[9px] truncate">Airtel</span>
                          </button>

                          {/* Credit Card */}
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            className={`py-2 px-1 border rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              paymentMethod === 'card'
                                ? 'border-primary bg-emerald-50/30 text-primary font-bold shadow-sm'
                                : 'border-emerald-900/10 bg-white/20 text-emerald-900/60 hover:bg-white/40'
                            }`}
                          >
                            <div className="w-7 h-7 rounded-lg bg-emerald-950 flex items-center justify-center text-white shadow-sm">
                              <CreditCard className="w-4 h-4 text-accent" />
                            </div>
                            <span className="text-[9px] truncate">Card</span>
                          </button>
                        </div>
                      </div>

                      {/* Conditionally Render Inputs Based on Selection */}
                      {paymentMethod === 'momo' && (
                        <div className="p-4 rounded-2xl bg-[#FFCC00]/5 border border-[#FFCC00]/20 space-y-2 animate-fade-in text-left">
                          <label htmlFor="checkoutMomoNumber" className="block text-[10px] font-semibold text-[#003366]/70 uppercase tracking-wider">
                            MTN Mobile Money Number
                          </label>
                          <input
                            type="tel"
                            id="checkoutMomoNumber"
                            required
                            value={momoNumber}
                            onChange={(e) => setMomoNumber(e.target.value)}
                            placeholder="e.g. 078XXXXXXX"
                            className="w-full px-3 py-2 rounded-xl border border-[#FFCC00]/30 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] outline-none text-xs bg-white"
                          />
                          <p className="text-[9px] text-[#003366]/60 leading-relaxed font-light">
                            You will receive a secure push notification prompt on your phone to input your MoMo PIN and approve the payment of <strong>${totalCost.toFixed(2)}</strong>.
                          </p>
                        </div>
                      )}

                      {paymentMethod === 'airtel' && (
                        <div className="p-4 rounded-2xl bg-[#E31837]/5 border border-[#E31837]/20 space-y-2 animate-fade-in text-left">
                          <label htmlFor="checkoutAirtelNumber" className="block text-[10px] font-semibold text-[#E31837]/70 uppercase tracking-wider">
                            Airtel Money Number
                          </label>
                          <input
                            type="tel"
                            id="checkoutAirtelNumber"
                            required
                            value={airtelNumber}
                            onChange={(e) => setAirtelNumber(e.target.value)}
                            placeholder="e.g. 073XXXXXXX"
                            className="w-full px-3 py-2 rounded-xl border border-[#E31837]/30 focus:border-[#E31837] focus:ring-1 focus:ring-[#E31837] outline-none text-xs bg-white"
                          />
                          <p className="text-[9px] text-[#E31837]/60 leading-relaxed font-light">
                            You will receive a secure push notification prompt on your phone to input your Airtel PIN and approve the payment of <strong>${totalCost.toFixed(2)}</strong>.
                          </p>
                        </div>
                      )}

                      {paymentMethod === 'card' && (
                        <div className="space-y-3 p-4 rounded-2xl bg-emerald-50/20 border border-emerald-950/5 animate-fade-in text-left">
                          <div>
                            <label className="block text-[10px] font-semibold text-emerald-900/50 uppercase tracking-wider mb-1">
                              Card Details
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                required
                                className="w-full pl-9 pr-3 py-2 rounded-xl border border-emerald-900/10 focus:border-primary outline-none text-xs bg-white"
                                placeholder="4111 2222 3333 4444"
                              />
                              <CreditCard className="absolute left-3 top-2.5 w-3.5 h-3.5 text-emerald-900/30" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-semibold text-emerald-900/50 uppercase tracking-wider mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                required
                                className="w-full px-3 py-2 rounded-xl border border-emerald-900/10 focus:border-primary outline-none text-xs bg-white"
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-semibold text-emerald-900/50 uppercase tracking-wider mb-1">
                                CVV
                              </label>
                              <input
                                type="text"
                                required
                                className="w-full px-3 py-2 rounded-xl border border-emerald-900/10 focus:border-primary outline-none text-xs bg-white"
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none"
                    >
                      Pay ${totalCost.toFixed(2)} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="w-full py-2.5 rounded-xl border border-emerald-900/10 text-emerald-900/70 hover:bg-emerald-50 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Back to Cart
                    </button>
                  </form>
                )}

                {checkoutStep === 'success' && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                    <div className="w-16 h-16 rounded-full bg-accent-light flex items-center justify-center text-primary">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xl font-bold text-emerald-950">Thank You for Your Order!</h4>
                      <p className="text-xs text-secondary mt-1">Your premium garden plants and tools are on their way.</p>
                      <p className="text-xs text-emerald-900/40 mt-4 max-w-xs mx-auto">
                        We have sent a confirmation email containing delivery details and a tracking link to your inbox.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        clearCart();
                        handleClose();
                      }}
                      className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors"
                    >
                      Continue Browsing
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Summary (Visible only if cart is not empty and step is 'cart' or 'checkout') */}
              {cart.length > 0 && checkoutStep !== 'success' && (
                <div className="p-6 border-t border-emerald-900/5 bg-emerald-50/10">
                  <div className="space-y-2.5 text-xs text-emerald-950 font-sans mb-4">
                    <div className="flex justify-between">
                      <span className="text-emerald-900/60">Cart Subtotal</span>
                      <span className="font-semibold">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-900/60">Shipping</span>
                      <span className="font-semibold">
                        {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-900/60">Estimated Tax</span>
                      <span className="font-semibold">${estimatedTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-emerald-900/5 pt-2.5 text-sm">
                      <span className="font-bold text-emerald-950">Grand Total</span>
                      <span className="font-extrabold text-primary">${totalCost.toFixed(2)}</span>
                    </div>
                  </div>

                  {checkoutStep === 'cart' && (
                    <button
                      onClick={() => setCheckoutStep('checkout')}
                      className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/10 hover:shadow-lg"
                    >
                      Proceed to Checkout <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
