import { memo, useCallback } from "react";
import { getNestedValue } from "@/shared/utils/nestedValueHandlers";
import type { Column, WithId } from "@/features/table/types";

export type RowProps<T extends WithId> = {
  row: T;
  columns: Column<T>[];
  onEdit: (row: T) => void;
};

export function Row<T extends WithId>({ row, columns, onEdit }: RowProps<T>) {
  const handleEdit = useCallback(() => onEdit(row), [onEdit, row]);

  return (
    <tr key={String(row.id)} className="bg-gray-300 hover:bg-gray-200">
      {columns.map((col) => (
        <td key={String(col.key)} className="px-4 py-2 align-top text-sm">
          {col.render ? col.render(row) : String(getNestedValue(row, col.key) ?? "")}
        </td>
      ))}
      <td className="flex justify-center px-4 py-2 align-top">
        <div className="flex gap-2">
          <button
            type="button"
            className="gray-container px-4 py-1 border rounded text-sm"
            onClick={handleEdit}
            title="Edit row"
          >
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
}

export const RowMemo = memo(Row) as typeof Row;
