import { Product } from "@/entities/product";
import { fetchJson } from "@/shared/api/utils/fetchJson";

export interface ProductsPage {
  total: number;
  data: Product[];
}

export async function fetchProducts(page: number, pageSize = 9): Promise<ProductsPage> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}&limit=${pageSize}`;
  return fetchJson<ProductsPage>(url);
}

export async function getProductById(id: number): Promise<Product> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
  return fetchJson<Product>(url);
}

export async function createOrUpdateProduct(product: Product): Promise<Product> {
  const method = product.id ? "PUT" : "POST";
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products${product?.id ? `/${product.id}` : ""}`;
  return fetchJson<Product>(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(id: number): Promise<void> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
  await fetchJson<null>(url, {
    method: "DELETE",
  });
}
