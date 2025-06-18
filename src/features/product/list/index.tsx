"use client";

import { ProductCard } from "@/features/product/card";
import { useProducts } from "@/shared/hooks/useProducts";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import styles from "./styles.module.scss";

export const ProductsList = () => {
  const { products, error, isLoading, loadMore } = useProducts();

  const { loaderRef } = useInfiniteScroll({
    callback: loadMore,
    enabled: !isLoading, // чтобы не дергать несколько раз
  });

  return (
    <section className={styles.list}>
      <div className={styles.list__grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {error && <div>Ошибка загрузки</div>}
      {isLoading && <div>Загрузка...</div>}
      <div ref={loaderRef} style={{ height: 1 }} />
    </section>
  );
};
