import { create } from 'zustand';
import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartStore {
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

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],

  addToCart: (
    product: Product,
    quantity: number = 1,
    color?: string,
    size?: string
  ) => {
    set((state) => {
      // Check if product with same options already exists
      const existingItemIndex = state.cartItems.findIndex(
        item => item.product.id === product.id &&
                item.selectedColor === color &&
                item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...state.cartItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return { cartItems: updatedItems };
      }

      // Add new item
      return {
        cartItems: [...state.cartItems, { product, quantity, selectedColor: color, selectedSize: size }]
      };
    });
  },

  removeFromCart: (productId: number) => {
    set((state) => ({
      cartItems: state.cartItems.filter(item => item.product.id !== productId)
    }));
  },

  updateQuantity: (productId: number, quantity: number) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }

    set((state) => ({
      cartItems: state.cartItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    }));
  },

  clearCart: () => {
    set({ cartItems: [] });
  },

  getTotalItems: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  },

  getCartSubtotal: () => {
    return get().getTotalPrice();
  },

  getCartDiscount: () => {
    const cartItems = get().cartItems;
    return cartItems.reduce((total, item) => {
      const originalTotal = (item.product.originalPrice || item.product.price) * item.quantity;
      const currentTotal = item.product.price * item.quantity;
      return total + (originalTotal - currentTotal);
    }, 0);
  },

  getCartShipping: () => {
    // Free shipping for orders over 500,000 VND
    const subtotal = get().getCartSubtotal();
    return subtotal >= 500000 ? 0 : 30000;
  },

  getCartTotal: () => {
    return get().getCartSubtotal() + get().getCartShipping();
  }
}));

export default useCartStore;