import { useState, useEffect, useCallback } from "react";
import useSWR, { mutate } from "swr";
import { fetchProducts } from "@/shared/api/product";
import { Product } from "@/entities/product";

const PAGE_SIZE = 12;

export function useProducts(appendMode = false) {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const { data, error, isLoading } = useSWR(`products-page-${page}`, () => fetchProducts(page, PAGE_SIZE), {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (data?.data) {
      setProducts((prev) => (appendMode && page > 1 ? [...prev, ...data.data] : data.data));
      setTotal(data.total);
    }
  }, [data, appendMode, page]);

  const loadMore = useCallback(() => {
    if (data && data.data?.length === PAGE_SIZE) {
      setPage((p) => p + 1);
    }
  }, [data]);

  const loadPage = useCallback(
    (pageIndex: number) => {
      if (totalPages * pageIndex > 0 && totalPages >= pageIndex) {
        setPage(pageIndex);
      }
    },
    [totalPages],
  );

  const refreshPage = useCallback(
    (pageIndex?: number) => {
      const targetPage = pageIndex ?? page;
      mutate(`products-page-${targetPage}`).catch((rej) => console.error(rej));
    },
    [page],
  );

  return { products, total, totalPages, error, isLoading, loadMore, loadPage, refreshPage };
}
