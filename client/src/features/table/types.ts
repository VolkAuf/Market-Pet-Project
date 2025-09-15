import type { BaseTypes } from "@/shared/utils/types";
import type { ReactNode } from "react";

export type ColumnType = "text" | "boolean" | "date" | "select" | "number";
export type FilterValue = string | boolean | "any" | Range;
export const BooleanFilterValues = ["True", "False"];

export type FilterParams = Record<string, FilterValue>;

export type Range = {
  from?: string | number;
  to?: string | number;
};

export type FilterHandler = (value: BaseTypes, filter: FilterValue) => boolean;
export type SortHandler = (a: BaseTypes, b: BaseTypes) => number;

export interface Column<T> {
  key: string;
  header: string;
  type: ColumnType;

  sortable?: boolean;
  comparer?: (a: T, b: T) => number;

  filterable?: boolean;
  filterType?: ColumnType;
  options?: string[];

  render?: (row: T) => ReactNode;
  editable?: boolean | ((row: T | null) => boolean);
}

export type Id = number;
export type WithId = {
  id: Id;
};
