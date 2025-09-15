import { create } from "zustand";
import { persist } from "zustand/middleware";
import pagesSeed from "@/data/pages.json";
import pricePlans from "@/data/price-plans.json";
import productsSeed from "@/data/products.json";
import type { Pages } from "@/entities/pages/types";
import type { PricePlans } from "@/entities/price-plans/types";
import type { Product } from "@/entities/product/types";
import type { Id, WithId } from "@/features/table/types";

type StoreState = {
  products: Product[];
  updateProduct: (id: number, partial: Partial<Product>) => void;
  setProducts: (newProducts: Product[]) => void;
  pages: Pages[];
  updatePages: (id: number, partial: Partial<Pages>) => void;
  setPages: (newProducts: Pages[]) => void;
  pricePlans: PricePlans[];
  updatePricePlans: (id: number, partial: Partial<PricePlans>) => void;
  setPricePlans: (newPricePlans: PricePlans[]) => void;
};

const updateArrayById = <T extends WithId>(arr: T[], id: Id, partial: Partial<T>) =>
  arr.map((item) => (item.id === id ? { ...item, ...partial } : item));

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      products: productsSeed as Product[],
      setProducts: (newProducts) => set({ products: newProducts }),
      updateProduct: (id, partial) => set((state) => ({ products: updateArrayById(state.products, id, partial) })),
      pages: pagesSeed as Pages[],
      setPages: (newPages) => set({ pages: newPages }),
      updatePages: (id, partial) => set((state) => ({ pages: updateArrayById(state.pages, id, partial) })),
      pricePlans: pricePlans as PricePlans[],
      setPricePlans: (newPricePlans) => set({ pricePlans: newPricePlans }),
      updatePricePlans: (id, partial) =>
        set((state) => ({ pricePlans: updateArrayById(state.pricePlans, id, partial) })),
    }),
    { name: "admin-store" },
  ),
);
