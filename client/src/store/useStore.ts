import { create } from "zustand";
import { persist } from "zustand/middleware";
import productsSeed from "@/data/products.json";
import type { Product } from "@/entities/product/types";

type StoreState = {
  products: Product[];
  updateProduct: (id: number, partial: Partial<Product>) => void;
  setProducts: (newProducts: Product[]) => void;
};

//TODO: use only as init value
export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      products: productsSeed as Product[],
      setProducts: (newProducts) => set({ products: newProducts }),
      updateProduct: (id, partial) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...partial } : p)),
        })),
    }),
    { name: "admin-store" },
  ),
);
