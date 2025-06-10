"use client";

import { useEffect, useRef } from "react";
import { ProductCard } from "@/features/product/card";
import { useProducts } from "@/shared/hooks/useProducts";
import styles from "./styles.module.scss";

export const ProductsList = () => {
  const { products, error, isLoading, loadMore } = useProducts();
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadMore]);

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
