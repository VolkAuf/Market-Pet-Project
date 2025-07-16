"use client";

import { useParams, useRouter } from "next/navigation";
import { ProductForm } from "@/page-components/productForm";
import { useEffect, useState } from "react";
import { Product } from "@/entities/product";
import { getProductById } from "@/shared/api/product";

export default function ProductCreatePanel() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = id === "new";

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew || !id) return;

    const parsedId = Number(id);
    if (Number.isNaN(parsedId)) {
      alert("Невалидный ID");
      router.push("/");
      return;
    }

    getProductById(parsedId)
      .then(setProduct)
      .catch((rej) => {
        alert(`Ошибка загрузки товара ${rej}`);
        router.push("/");
      })
      .finally(() => setLoading(false));
  }, [id, isNew, router]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="p-6">
      <ProductForm productProp={product} />
    </div>
  );
}
