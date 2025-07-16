import { Product } from "@/entities/product";

export interface ProductsPage {
  total: number;
  data: Product[];
}

export async function fetchProducts(page: number, pageSize = 9): Promise<ProductsPage> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}&limit=${pageSize}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetchProducts with response: ${res}`);
  }
  return res.json();
}

export async function getProductById(id: number): Promise<Product> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to getProductById with response: ${res}`);
  }
  return res.json();
}

export async function createOrUpdateProduct(product: Product): Promise<Product> {
  const method = product.id ? "PUT" : "POST";
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products${product?.id ? `/${product.id}` : ""}`;

  const res = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error(`Failed to CreateOrUpdateProduct with response: ${res}`);
  }

  return res.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to deleteProduct with response: ${res}`);
  }
}
