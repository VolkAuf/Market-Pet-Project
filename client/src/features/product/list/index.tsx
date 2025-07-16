"use client";

import { ProductCard } from "@/features/product/card";
import { useProducts } from "@/shared/hooks/useProducts";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { Loader } from "@/shared/ui/components/loader";

export const ProductsList = () => {
  const { products, error, isLoading, loadMore } = useProducts();

  const { loaderRef } = useInfiniteScroll({
    callback: loadMore,
    enabled: !isLoading,
  });

  return (
    <section className="flex justify-center items-center w-full mt-12 mx-3">
      <div
        className="grid justify-items-center gap-x-8 gap-y-4 w-full grid-cols-1 sm:grid-cols-2
      xl:grid-cols-3 xl:gap-y-11"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Loader text={"Загрузка..."} isActive={isLoading} />
      <Loader text={"Ошибка загрузки"} isActive={error} />
      <div ref={loaderRef} style={{ height: 1 }} />
    </section>
  );
};
