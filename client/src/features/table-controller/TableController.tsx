"use client";

import { useCallback } from "react";
import { useRowEditing } from "@/features/edit-modal/hooks/useRowEditing";
import { MemoEditModal } from "@/features/edit-modal/ui/EditModal";
import { MemoTable } from "@/features/table/ui/Table";
import type { Column, WithId } from "@/features/table/types";
import type { Id } from "@/features/table/types";

type TableControllerProps<T extends WithId> = {
  rows: T[];
  columns: Column<T>[];
  updateRow: (id: Id, partial: Partial<T>) => void;
  className?: string;
};

export function TableController<T extends WithId>({
  rows,
  columns,
  updateRow,
  className = "p-6",
}: TableControllerProps<T>) {
  const { open, onOpenChange, editing, onEdit } = useRowEditing(rows);

  const onSave = useCallback(
    (partial: Partial<T>) => {
      if (!editing) return;
      updateRow(editing.id, partial);
    },
    [editing, updateRow],
  );

  return (
    <div className={className}>
      <MemoTable<T> data={rows} columns={columns} onEdit={onEdit} />
      <MemoEditModal<T> open={open} onOpenChange={onOpenChange} row={editing} columns={columns} onSave={onSave} />
    </div>
  );
}
