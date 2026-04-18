import { useState, useEffect, createContext, useContext } from 'react';
import { ShopifyCart } from '@/types/shopify';
import { shopify } from '@/lib/shopify';
import { toast } from 'sonner';

interface CartContextType {
  cart: ShopifyCart | null;
  isLoading: boolean;
  addToCart: (variantId: string, quantity?: number) => Promise<ShopifyCart | null>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateCartLine: (lineId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

// Hook for cart functionality
export const useCartActions = () => {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize cart on mount — recover existing or create new
  useEffect(() => {
    const initCart = async () => {
      try {
        const existingCartId = localStorage.getItem('noori-cart-id');

        if (existingCartId) {
          // Try to recover existing cart from Shopify
          const existingCart = await shopify.getCart(existingCartId);
          if (existingCart) {
            setCart(existingCart);
            return;
          }
        }

        // No existing cart or cart expired — create new
        const newCart = await shopify.createCart();
        setCart(newCart);
        localStorage.setItem('noori-cart-id', newCart.id);
      } catch (error) {
        console.error('Failed to initialize cart:', error);
      }
    };

    initCart();
  }, []);

  const addToCart = async (variantId: string, quantity = 1): Promise<ShopifyCart | null> => {
    if (!cart) return null;

    setIsLoading(true);
    try {
      const updatedCart = await shopify.addToCart(cart.id, variantId, quantity);
      setCart(updatedCart);
      localStorage.setItem('noori-cart-id', updatedCart.id);
      setIsCartOpen(true);
      toast.success('Added to cart!');
      return updatedCart;
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add item to cart');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (lineId: string) => {
    if (!cart) return;

    setIsLoading(true);
    try {
      const updatedCart = await shopify.removeFromCart(cart.id, [lineId]);
      setCart(updatedCart);
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      toast.error('Failed to remove item');
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartLine = async (lineId: string, quantity: number) => {
    if (!cart) return;

    setIsLoading(true);
    try {
      const updatedCart = await shopify.updateCartLine(cart.id, lineId, quantity);
      setCart(updatedCart);
      toast.success('Cart updated');
    } catch (error) {
      console.error('Failed to update cart:', error);
      toast.error('Failed to update cart');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    if (!cart) return;

    setIsLoading(true);
    try {
      const newCart = await shopify.createCart();
      setCart(newCart);
      localStorage.setItem('noori-cart-id', newCart.id);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast.error('Failed to clear cart');
    } finally {
      setIsLoading(false);
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateCartLine,
    clearCart,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart
  };
};
