import { type AriaAttributes, memo, useCallback } from "react";
import type { SortState } from "@/features/table/lib/sorter/handlers";
import type { Column, WithId } from "@/features/table/types";

export type HeaderCellProps<T extends WithId> = {
  col: Column<T>;
  sort: SortState;
  onToggleSort: (key: string) => void;
};

export function HeaderCell<T extends WithId>({ col, sort, onToggleSort }: HeaderCellProps<T>) {
  const active = sort.key === col.key;
  const ariaSort: AriaAttributes["aria-sort"] = active ? (sort.dir === "asc" ? "ascending" : "descending") : "none";
  const handleClick = useCallback(() => onToggleSort(String(col.key)), [onToggleSort, col.key]);

  return (
    <th key={String(col.key)} className="px-4 py-2 text-left align-top" aria-sort={ariaSort}>
      <div className="flex items-center gap-2">
        {col.sortable ? (
          <button
            type="button"
            className="text-xs px-2 py-1 rounded hover:bg-gray-100"
            onClick={handleClick}
            title={`Sort by ${col.header}`}
          >
            <span className="font-medium text-sm">{col.header}</span> {active ? (sort.dir === "asc" ? "↑" : "↓") : "↕"}
          </button>
        ) : (
          <span className="font-medium text-sm">{col.header}</span>
        )}
      </div>
    </th>
  );
}

export const HeaderCellMemo = memo(HeaderCell) as typeof HeaderCell;
