import type { WithId } from "@/features/table/types";

export type Product = WithId & {
  name: string;
  options: ProductOptions;
  active: boolean;
  createdAt: string;
};

export type ProductOptions = {
  size: ProductSize;
  amount: number;
};

export const productSize = ["S", "M", "L", "XL", "XXL"] as const;
export type ProductSize = (typeof productSize)[number];
