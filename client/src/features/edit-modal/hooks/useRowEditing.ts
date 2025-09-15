import { useCallback, useMemo, useState } from "react";
import type { Id, WithId } from "@/features/table/types";

export function useRowEditing<T extends WithId>(rows: T[]) {
  const [editingId, setEditingId] = useState<Id | null>(null);
  const [open, setOpen] = useState(false);

  const editing = useMemo(() => (editingId ? (rows.find((r) => r.id === editingId) ?? null) : null), [rows, editingId]);

  const onEdit = useCallback((row: T) => {
    setEditingId(row.id);
    setOpen(true);
  }, []);

  const onOpenChange = useCallback((v: boolean) => setOpen(v), []);

  return { open, onOpenChange, editing, setEditingId, onEdit };
}
