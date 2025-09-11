"use client";

import { type JSX, memo, useCallback, useMemo, useState } from "react";
import { filterRow } from "@/features/table/lib/filter/handlers";
import { sortData, type SortState } from "@/features/table/lib/sorter/handlers";
import { FilterInputMemo } from "@/features/table/ui/filter/FilterInput";
import { HeaderCell, type HeaderCellProps } from "@/features/table/ui/header-cell/HeaderCell";
import { Row, type RowProps } from "@/features/table/ui/row/Row";
import type { Column, FilterParams, FilterValue, WithId } from "@/features/table/types";

type TableProps<T extends WithId> = {
  data: T[];
  columns: Column<T>[];
  onEdit: (row: T) => void;
};

const HeaderCellMemo = memo(HeaderCell) as <T extends WithId>(p: HeaderCellProps<T>) => JSX.Element;
const RowMemo = memo(Row) as <T extends WithId>(p: RowProps<T>) => JSX.Element;

export function Table<T extends WithId>({ data, columns, onEdit }: TableProps<T>) {
  const [sort, setSort] = useState<SortState>({ dir: "asc" });
  const [filters, setFilters] = useState<FilterParams>({});

  const setFilter = useCallback((key: string, nextValue: FilterValue) => {
    setFilters((prev) => {
      const cur = prev[key];
      if (cur === nextValue) return prev;
      return { ...prev, [key]: nextValue };
    });
  }, []);

  const clearFilter = useCallback(() => {
    setFilters({});
  }, []);

  const filtered = useMemo(() => {
    if (data.length === 0) return [];
    return data.filter((row) => filterRow(row, columns, filters));
  }, [data, filters, columns]);

  const sorted = useMemo(() => sortData(filtered, columns, sort), [filtered, sort, columns]);

  const toggleSort = useCallback((key: string) => {
    setSort((s) => {
      if (s.key !== key) return { key, dir: "asc" };
      return { key, dir: s.dir === "asc" ? "desc" : "asc" };
    });
  }, []);

  return (
    <div className="overflow-auto border rounded">
      <table className="min-w-full table-fixed">
        <thead className="bg-gray-400">
          <tr>
            {columns.map((col) => (
              <HeaderCellMemo key={col.key} col={col} sort={sort} onToggleSort={toggleSort} />
            ))}
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>

          <tr className="bg-white">
            {columns.map((col) => (
              <th key={col.key} className="text-start px-4 py-2 align-top bg-gray-300">
                {col.filterable ? (
                  <FilterInputMemo col={col} value={filters[col.key] ?? null} setFilter={setFilter} />
                ) : null}
              </th>
            ))}
            <th className="flex justify-center px-4 py-2 align-top bg-gray-300">
              <button
                type="button"
                className="gray-container px-3 py-1 border rounded text-sm"
                onClick={clearFilter}
                title="Edit row"
              >
                Clear
              </button>
            </th>
            <th />
          </tr>
        </thead>

        <tbody className="bg-white divide-y bg-gray-300">
          {sorted.map((row) => (
            <RowMemo key={String(row.id)} row={row} columns={columns} onEdit={onEdit} />
          ))}

          {sorted.length === 0 && (
            <tr>
              <td className="px-4 py-8 text-center text-sm text-gray-500 bg-gray-300" colSpan={columns.length + 1}>
                No rows
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
