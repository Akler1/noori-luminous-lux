import { useState, useEffect, createContext, useContext } from 'react';
import { ShopifyCart } from '@/types/shopify';
import { shopify } from '@/lib/shopify';
import { toast } from 'sonner';

interface CartContextType {
  cart: ShopifyCart | null;
  isLoading: boolean;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
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

// Hook for cart functionality without context
export const useCartActions = () => {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize cart on mount
  useEffect(() => {
    const initCart = async () => {
      try {
        const existingCartId = localStorage.getItem('noori-cart-id');
        if (existingCartId) {
          // In real implementation, fetch existing cart
          // For now, create new cart
          const newCart = await shopify.createCart();
          setCart(newCart);
          localStorage.setItem('noori-cart-id', newCart.id);
        } else {
          const newCart = await shopify.createCart();
          setCart(newCart);
          localStorage.setItem('noori-cart-id', newCart.id);
        }
      } catch (error) {
        console.error('Failed to initialize cart:', error);
        toast.error('Failed to initialize cart');
      }
    };

    initCart();
  }, []);

  const addToCart = async (variantId: string, quantity = 1) => {
    if (!cart) return;
    
    setIsLoading(true);
    try {
      const updatedCart = await shopify.addToCart(cart.id, variantId, quantity);
      setCart(updatedCart);
      setIsCartOpen(true);
      toast.success(`Added to cart! Continue shopping or view your cart.`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (lineId: string) => {
    if (!cart) return;
    
    setIsLoading(true);
    try {
      // Mock implementation - in real app, call Shopify API
      await new Promise(resolve => setTimeout(resolve, 300));
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
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 300));
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