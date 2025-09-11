import { getNestedValue } from "@/shared/utils/nestedValueHandlers";
import type { Column, ColumnType, SortHandler } from "@/features/table/types";

const sortHandlers: Record<ColumnType, SortHandler> = {
  number: (a, b) => Number(a) - Number(b),
  date: (a, b) => {
    const validA = typeof a === "string" || typeof a === "number";
    const validB = typeof b === "string" || typeof b === "number";
    if (!validA || !validB) return Number(Boolean(validA)) - Number(Boolean(validB));
    return new Date(a).getTime() - new Date(b).getTime();
  },
  text: (a, b) => {
    const sa = String(a ?? "").toLowerCase();
    const sb = String(b ?? "").toLowerCase();
    return sa.localeCompare(sb);
  },
  boolean: (a, b) => Number(Boolean(a)) - Number(Boolean(b)),
  select: (a, b) => String(a).localeCompare(String(b)),
};

export type SortDirection = "asc" | "desc";
export type SortState = { key?: string; dir: SortDirection };

export function sortData<T>(data: T[], columns: Column<T>[], sortState: SortState): T[] {
  if (!sortState.key) return data;

  const col = columns.find((c) => c.key === sortState.key);
  if (!col) return data;

  const arr = [...data];

  arr.sort((a, b) => {
    const va = getNestedValue(a, col.key);
    const vb = getNestedValue(b, col.key);

    if (va == null && vb == null) return 0;
    if (va == null) return -1;
    if (vb == null) return 1;

    if (col.comparer) {
      return col.comparer(a, b);
    }

    const handler = sortHandlers[col.type];
    return handler ? handler(va, vb) : 0;
  });

  if (sortState.dir === "desc") arr.reverse();
  return arr;
}
