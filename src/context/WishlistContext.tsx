import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../data/products';

interface WishlistContextType {
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  getTotalWishlistItems: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  const toggleWishlist = (product: Product) => {
    setWishlistItems(prev =>
      prev.some(item => item.id === product.id)
        ? prev.filter(item => item.id !== product.id)
        : [...prev, product]
    );
  };

  const isInWishlist = (productId: number) => wishlistItems.some(item => item.id === productId);
  const getTotalWishlistItems = () => wishlistItems.length;

  const value = { wishlistItems, toggleWishlist, isInWishlist, getTotalWishlistItems };
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
