import { useState, useEffect, useCallback } from "react";
import useSWR from "swr";
import { fetchProducts } from "@/shared/api/product";
import { Product } from "@/entities/product";

const PAGE_SIZE = 20;

export function useProducts() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);

  const { data, error, isLoading } = useSWR(`products-page-${page}`, () => fetchProducts(page, PAGE_SIZE), {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (data?.items) {
      setProducts((prev) => [...prev, ...data.items]);
    }
  }, [data]);

  const loadMore = useCallback(() => {
    if (data && data.items?.length === PAGE_SIZE) {
      setPage((p) => p + 1);
    }
  }, [data]);

  return { products, error, isLoading, loadMore };
}
