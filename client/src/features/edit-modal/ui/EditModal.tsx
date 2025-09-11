"use client";

import { useCallback, useEffect, useState } from "react";
import { EditorInputMemo } from "@/features/edit-modal/ui/editorInput/EditorInput";
import { ModalPortalMemo } from "@/shared/ui/components/modalPortal";
import { deepClone } from "@/shared/utils/deepClone";
import { getNestedValue, setNestedImmutable } from "@/shared/utils/nestedValueHandlers";
import type { Column } from "@/features/table/types";
import type { BaseTypes } from "@/shared/utils/types";

export type EditModalProps<T extends Record<string, unknown>> = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  columns: Column<T>[];
  row: T | null;
  onSave: (updated: T) => void;
};

export function EditModal<T extends Record<string, unknown>>({
  open,
  onOpenChange,
  columns,
  row,
  onSave,
}: EditModalProps<T>) {
  const [form, setForm] = useState<T | null>(row ? deepClone(row) : null);

  useEffect(() => {
    setForm(row ? deepClone(row) : null);
  }, [row]);

  const onChangeField = useCallback((key: string, value: BaseTypes) => {
    setForm((prev) => (prev ? setNestedImmutable<T>(prev, key, value) : prev));
  }, []);

  const handleSave = useCallback(() => {
    if (!form) return;
    onSave(form);
    onOpenChange(false);
  }, [form, onSave, onOpenChange]);

  const onOverlayClick = useCallback(() => onOpenChange(false), [onOpenChange]);

  if (!open || !row) return null;

  return (
    <ModalPortalMemo open={open} onClose={onOverlayClick}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Edit"
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-full max-w-2xl focus:outline-none"
      >
        <h3 className="text-lg font-semibold mb-4">Edit</h3>

        <div className="space-y-3 max-h-[60vh] overflow-auto pr-2">
          {columns.map((col) => {
            const val = getNestedValue(form, col.key) ?? null;
            const enabled = typeof col.editable === "function" ? col.editable(form) : Boolean(col?.editable);
            return (
              <div key={col.key} className="flex flex-col">
                <label className="text-xl mb-1">{col.header}</label>
                <EditorInputMemo col={col} value={val} onChange={onChangeField} enabled={enabled} />
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="gray-container-sm px-3 py-1 border rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-3 py-1 bg-blue-600 text-white text-2xl rounded disabled:opacity-50"
            disabled={!form}
          >
            Save
          </button>
        </div>
      </div>
    </ModalPortalMemo>
  );
}
