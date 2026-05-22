import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower2 } from 'lucide-react';

export interface ProductType {
  id: string;
  name: string;
  category: string;
  type: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  tag?: string;
  collections: string[];
  description: string;
}

export interface CartItemType extends ProductType {
  quantity: number;
}

interface CartContextType {
  cart: CartItemType[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: ProductType, clickEvent?: React.MouseEvent | null) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, amount: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  notification: string | null;
}

interface FlyingItem {
  id: number;
  productImage: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItemType[]>(() => {
    const localData = localStorage.getItem('kundabo_cart');
    return localData ? JSON.parse(localData) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);

  useEffect(() => {
    localStorage.setItem('kundabo_cart', JSON.stringify(cart));
  }, [cart]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToCart = (product: ProductType, clickEvent: React.MouseEvent | null = null) => {
    // Coordinate calculation for fly-to-cart animation
    if (clickEvent) {
      const rect = clickEvent.currentTarget.getBoundingClientRect();
      const startX = rect.left + rect.width / 2;
      const startY = rect.top + rect.height / 2;

      const cartBtn = document.getElementById('navbar-cart-btn');
      let endX = window.innerWidth - 80;
      let endY = 40;
      if (cartBtn) {
        const cartRect = cartBtn.getBoundingClientRect();
        endX = cartRect.left + cartRect.width / 2;
        endY = cartRect.top + cartRect.height / 2;
      }

      const animationId = Date.now() + Math.random();
      const newFlyingItem: FlyingItem = {
        id: animationId,
        productImage: product.image,
        startX,
        startY,
        endX,
        endY,
      };

      setFlyingItems((prev) => [...prev, newFlyingItem]);

      // Remove item and trigger cart icon bounce
      setTimeout(() => {
        setFlyingItems((prev) => prev.filter((item) => item.id !== animationId));
        if (cartBtn) {
          cartBtn.classList.add('animate-bounce-quick');
          setTimeout(() => {
            cartBtn.classList.remove('animate-bounce-quick');
          }, 400);
        }
      }, 850);
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        showNotification(`Increased ${product.name} quantity in cart`);
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showNotification(`Added ${product.name} to cart`);
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === productId);
      if (item) {
        showNotification(`Removed ${item.name} from cart`);
      }
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, amount: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItemType => item !== null);
    });
  };

  const clearCart = () => {
    setCart([]);
    showNotification('Cart cleared');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        notification,
      }}
    >
      {children}

      {/* Flying Morphing Bouquets Layer */}
      <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
        <AnimatePresence>
          {flyingItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{
                x: item.startX - 24,
                y: item.startY - 24,
                scale: 1,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                x: [
                  item.startX - 24,
                  (item.startX + item.endX) / 2 - 24,
                  item.endX - 24,
                ],
                y: [
                  item.startY - 24,
                  Math.min(item.startY, item.endY) - 80,
                  item.endY - 24,
                ],
                scale: [1, 1.2, 0.1],
                rotate: [0, 180, 540, 720],
                opacity: [1, 1, 0.9, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.85,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="absolute w-12 h-12 rounded-full shadow-2xl flex items-center justify-center"
            >
              {/* Product Image that morphs out */}
              <motion.img
                src={item.productImage}
                alt=""
                animate={{
                  opacity: [1, 0.8, 0, 0],
                  borderRadius: ['16px', '50%'],
                }}
                transition={{ duration: 0.85, times: [0, 0.2, 0.35, 1] }}
                className="absolute inset-0 w-full h-full object-cover rounded-full border border-emerald-950/20"
              />

              {/* Bouquet Icon that morphs in */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 0.3, 1, 1],
                  scale: [0.5, 0.8, 1, 1],
                }}
                transition={{ duration: 0.85, times: [0, 0.2, 0.35, 1] }}
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent to-accent-light rounded-full border-2 border-white shadow-inner"
              >
                <Flower2 className="w-6 h-6 text-primary fill-white" />
              </motion.div>

              {/* Magical sparkling particles trail */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.8, scale: 0.8 }}
                  animate={{
                    x: [0, (Math.random() - 0.5) * 50],
                    y: [0, (Math.random() - 0.5) * 50],
                    opacity: [0.8, 0],
                    scale: [0.8, 0.2],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 * i,
                    repeat: Infinity,
                  }}
                  className="absolute w-2 h-2 rounded-full bg-accent-light shadow-sm"
                />
              ))}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </CartContext.Provider>
  );
};
