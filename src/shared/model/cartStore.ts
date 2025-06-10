import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/entities/product";

type CartItem = Product & {
  quantity: number;
};

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  setToCart: (id: number, count: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) => {
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            };
          }
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        });
      },
      increment: (id) => {
        set((state) => {
          const existing = state.items.find((item) => item.id === id);
          if (!existing) {
            throw new Error("attempt to increment a non-existent object");
          }

          return {
            items: state.items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
          };
        });
      },
      decrement: (id) => {
        set((state) => {
          const existing = state.items.find((item) => item.id === id);
          if (!existing) {
            throw new Error("attempt to delete a non-existent object");
          }

          if (existing.quantity > 1) {
            return {
              items: state.items.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item)),
            };
          }
          return {
            items: state.items.filter((item) => item.id !== id),
          };
        });
      },
      setToCart: (id, count) => {
        set((state) => {
          const existing = state.items.find((item) => item.id === id);
          if (!existing) {
            throw new Error("attempt to set a non-existent object");
          }

          if (count >= 1) {
            return {
              items: state.items.map((item) => (item.id === id ? { ...item, quantity: count } : item)),
            };
          }
          return {
            items: state.items.filter((item) => item.id !== id),
          };
        });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage",
    },
  ),
);
