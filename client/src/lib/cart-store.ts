import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);
        
        if (existingItem) {
          set({
            items: items.map((i) => 
              i.id === item.id 
                ? { ...i, quantity: i.quantity + item.quantity } 
                : i
            ),
          });
        } else {
          set({ items: [...items, item] });
        }
      },
      
      removeItem: (itemId) => {
        set({ items: get().items.filter((i) => i.id !== itemId) });
      },
      
      updateQuantity: (itemId, quantity) => {
        set({
          items: get().items.map((i) => 
            i.id === itemId ? { ...i, quantity } : i
          ),
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      subtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity, 
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
