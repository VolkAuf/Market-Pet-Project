import { getNestedValue } from "@/shared/utils/nestedValueHandlers";
import type { Column, ColumnType, FilterHandler, FilterParams } from "@/features/table/types";

const filterHandlers: Record<ColumnType, FilterHandler> = {
  text: (val, f) =>
    String(val ?? "")
      .toLowerCase()
      .includes(String(f).toLowerCase()),
  boolean: (val, f) => {
    if (f === true || f === "True") return Boolean(val);
    if (f === false || f === "False") return !Boolean(val);
    return true;
  },
  date: (val, f) => {
    if (!f || typeof f !== "object" || Array.isArray(f)) return true;
    if (!f.from && !f.to) return true;
    if (!val || (typeof val !== "string" && typeof val !== "number")) return false;
    const d = new Date(val);
    if (f.from && d < new Date(f.from.toString())) return false;
    if (f.to && d > new Date(f.to.toString())) return false;
    return true;
  },
  number: (val, f) => {
    if (!f || typeof f !== "object" || Array.isArray(f)) return true;
    const n = val == null ? NaN : Number(val);
    if (f.from != null && n < Number(f.from)) return false;
    if (f.to != null && n > Number(f.to)) return false;
    return true;
  },
  select: (val, f) => {
    if (val === null) return false;
    if (f === "any") return true;
    return String(val) === String(f);
  },
};

export function filterRow<T>(row: T, columns: Column<T>[], filters: FilterParams): boolean {
  return columns.every((col) => {
    if (!col.filterable) return true;

    const f = filters[col.key];
    if (f == null || f === "" || (typeof f === "object" && !Array.isArray(f) && Object.keys(f).length === 0)) {
      return true;
    }

    const val = getNestedValue(row, col.key);
    const handler = col.filterType ? filterHandlers[col.filterType] : undefined;
    return handler && val !== undefined ? handler(val, f) : true;
  });
}
