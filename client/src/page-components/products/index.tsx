"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { productColumns } from "@/entities/product/columns";
import { EditModal } from "@/features/edit-modal/ui/EditModal";
import { Table } from "@/features/table/ui/Table";
import { useStore } from "@/store/useStore";
import type { Product } from "@/entities/product/types";
import type { Id } from "@/features/table/types";

const MemoTable = memo(function MemoTable({
  products,
  onEdit,
}: {
  products: Product[];
  onEdit: (row: Product) => void;
}) {
  return <Table data={products} columns={productColumns} onEdit={onEdit} />;
});

const MemoEditModal = memo(function MemoEditModal({
  open,
  onOpenChange,
  row,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  row: Product | null;
  onSave: (updated: Product) => void;
}) {
  return <EditModal open={open} onOpenChange={onOpenChange} columns={productColumns} row={row} onSave={onSave} />;
});

export const ProductsPage = () => {
  const products = useStore((s) => s.products);
  const updateProduct = useStore((s) => s.updateProduct);

  const [editingId, setEditingId] = useState<Id | null>(null);
  const [open, setOpen] = useState(false);

  const editing = useMemo(
    () => (editingId ? (products.find((p) => p.id === editingId) ?? null) : null),
    [products, editingId],
  );

  const editHandler = useCallback((row: Product) => {
    setEditingId(row.id);
    setOpen(true);
  }, []);

  const onOpenChange = useCallback((v: boolean) => setOpen(v), []);

  const onSave = useCallback(
    (partial: Partial<Product>) => {
      if (!editingId) return;
      updateProduct(editingId, partial);
    },
    [updateProduct, editingId],
  );

  return (
    <div className="p-6">
      <MemoTable products={products} onEdit={editHandler} />
      <MemoEditModal open={open} onOpenChange={onOpenChange} row={editing} onSave={onSave} />
    </div>
  );
};
