import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { message } from 'antd';
import useLocalStorage from '../../hooks/useLocalStorage';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedColor: 'yellow' | 'white' | 'rose';
  image: string;
  popularity_score: number;
  addedAt: string;
}

export interface CartContextType {
  items: CartItem[];
  itemsCount: number;
  totalPrice: number;
  addToCart: (item: Omit<CartItem, 'quantity' | 'addedAt'>) => void;
  removeFromCart: (id: string, color: string) => void;
  updateQuantity: (id: string, color: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: string, color: string) => boolean;
  getItemQuantity: (id: string, color: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
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
  const [items, setItems] = useLocalStorage<CartItem[]>('karat-cart', []);

  // Calculate derived values
  const itemsCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Add item to cart
  const addToCart = (newItem: Omit<CartItem, 'quantity' | 'addedAt'>) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === newItem.id && item.selectedColor === newItem.selectedColor
      );

      if (existingItemIndex >= 0) {
        // Item already exists, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        message.success('Quantity updated in cart');
        return updatedItems;
      } else {
        // Add new item
        const cartItem: CartItem = {
          ...newItem,
          quantity: 1,
          addedAt: new Date().toISOString()
        };
        message.success('Item added to cart');
        return [...prevItems, cartItem];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id: string, color: string) => {
    setItems(prevItems => {
      const filteredItems = prevItems.filter(
        item => !(item.id === id && item.selectedColor === color)
      );
      message.info('Item removed from cart');
      return filteredItems;
    });
  };

  // Update item quantity
  const updateQuantity = (id: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, color);
      return;
    }

    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id && item.selectedColor === color) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setItems([]);
    message.info('Cart cleared');
  };

  // Check if item is in cart
  const isInCart = (id: string, color: string): boolean => {
    return items.some(item => item.id === id && item.selectedColor === color);
  };

  // Get item quantity
  const getItemQuantity = (id: string, color: string): number => {
    const item = items.find(item => item.id === id && item.selectedColor === color);
    return item ? item.quantity : 0;
  };

  const contextValue: CartContextType = {
    items,
    itemsCount,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};