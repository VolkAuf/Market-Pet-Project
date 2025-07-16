"use client";

import { useCallback, useEffect, useState } from "react";
import { ProductCard } from "@/features/product/card";
import { useProducts } from "@/shared/hooks/useProducts";
import { Loader } from "@/shared/ui/components/loader";

export const ProductsList = () => {
  const [page, setPage] = useState(1);
  const { products, totalPages, error, isLoading, loadPage, refreshPage } = useProducts();

  useEffect(() => {
    if (page > totalPages) {
      setPage((prev) => prev - 1);
    }
  }, [products, page, totalPages]);

  useEffect(() => {
    loadPage(page);
  }, [page, loadPage]);

  const onProductChange = useCallback(() => {
    refreshPage(page);
  }, [page, refreshPage]);

  return (
    <section className="flex flex-col justify-center items-center gap-4 w-full mt-12 mx-3">
      <div
        className="grid justify-items-center gap-x-8 gap-y-4 w-full grid-cols-1 sm:grid-cols-2
      xl:grid-cols-3 xl:gap-y-11"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onProductChange={onProductChange} />
        ))}
      </div>
      <Loader text={"Загрузка..."} isActive={isLoading} />
      <Loader text={`Ошибка загрузки: ${error}`} isActive={error} />
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Назад
        </button>
        <span className="px-4 py-1">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page >= totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Вперёд
        </button>
      </div>
    </section>
  );
};
