import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getCartSubtotal: () => number;
  getCartDiscount: () => number;
  getCartShipping: () => number;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((
    product: Product, 
    quantity: number = 1, 
    color?: string, 
    size?: string
  ) => {
    setCartItems(prevItems => {
      // Check if product with same options already exists
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && 
                item.selectedColor === color && 
                item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      }

      // Add new item
      return [...prevItems, { product, quantity, selectedColor: color, selectedSize: size }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }, [cartItems]);

  const getCartSubtotal = useCallback(() => {
    return getTotalPrice();
  }, [getTotalPrice]);

  const getCartDiscount = useCallback(() => {
    // Calculate total discount amount
    return cartItems.reduce((total, item) => {
      const originalTotal = (item.product.originalPrice || item.product.price) * item.quantity;
      const currentTotal = item.product.price * item.quantity;
      return total + (originalTotal - currentTotal);
    }, 0);
  }, [cartItems]);

  const getCartShipping = useCallback(() => {
    // Free shipping for orders over 500,000 VND
    const subtotal = getCartSubtotal();
    return subtotal >= 500000 ? 0 : 30000;
  }, [getCartSubtotal]);

  const getCartTotal = useCallback(() => {
    return getCartSubtotal() + getCartShipping();
  }, [getCartSubtotal, getCartShipping]);

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getCartSubtotal,
    getCartDiscount,
    getCartShipping,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;