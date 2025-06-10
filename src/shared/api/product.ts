import { Product } from "@/entities/product";

export interface ProductsPage {
  page: number;
  amount: number;
  total: number;
  items: Product[];
}

export async function fetchProducts(page: number, pageSize = 20): Promise<ProductsPage> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}&page_size=${pageSize}`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}
