
import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types/product";
import { notifySuccess, notifyError } from "@/components/ToastProvider"; 



interface CartContextType {
  cartItems: Product[];
  wishlistItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInCart: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
  updateQuantity: (productId: string, change: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    if (!isInCart(product.id)) {
      setCartItems([...cartItems, product]);
    // notifySuccess("Added to Cart");
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    // notifySuccess( "Removed from Cart");
  };

  const updateQuantity = (productId: string, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) }
          : item
      )
    );
  };

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlistItems([...wishlistItems, product]);
      // notifySuccess("Added to Wishlist");
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
    // notifySuccess( "Removed from Wishlist");
  };

  const isInCart = (productId: string) => {
    return cartItems.some(item => item.id === productId);
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      wishlistItems,
      addToCart,
      removeFromCart,
      addToWishlist,
      removeFromWishlist,
      isInCart,
      isInWishlist,
      updateQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
