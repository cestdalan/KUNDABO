import React, { createContext, useContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    localStorage.setItem('kundabo_cart', JSON.stringify(cart));
  }, [cart]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToCart = (product: ProductType, _clickEvent: React.MouseEvent | null = null) => {
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
    </CartContext.Provider>
  );
};
