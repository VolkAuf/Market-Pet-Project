"use client";

import { productColumns } from "@/entities/product/columns";
import { TableController } from "@/features/table-controller/TableController";
import { useStore } from "@/store/useStore";
import type { Product } from "@/entities/product/types";

export const ProductsPage = () => {
  const products = useStore((s) => s.products);
  const updateProduct = useStore((s) => s.updateProduct);

  return <TableController<Product> rows={products} columns={productColumns} updateRow={updateProduct} />;
};
