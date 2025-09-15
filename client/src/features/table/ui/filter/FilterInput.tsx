import { memo, useCallback } from "react";
import { type Column, type FilterValue } from "@/features/table/types";
import { DateFilter } from "@/features/table/ui/filter/inputs/DateFilter";
import { RangeFilter } from "@/features/table/ui/filter/inputs/RangeFilter";
import { SelectFilter } from "@/features/table/ui/filter/inputs/SelectFilter";
import { TextFilter } from "@/features/table/ui/filter/inputs/TextFilter";

type FilterInputProps<T> = {
  col: Column<T>;
  value: FilterValue | null;
  setFilter: (key: string, value: FilterValue) => void;
};

export function FilterInput<T>({ col, value, setFilter }: FilterInputProps<T>) {
  const changeHandler = useCallback((value: FilterValue) => setFilter(col.key, value), [col.key, setFilter]);

  if (!col.filterable || !col.filterType) return null;

  const errorTypes = `filter value type not match with column type value:${value} col:${col.key}`;

  switch (col.filterType) {
    case "text":
      const stringValue = value?.toString() ?? "";
      return <TextFilter value={stringValue} onChange={changeHandler} />;
    case "date":
      if (typeof value !== "object") {
        console.error(errorTypes);
        return null;
      }
      return <DateFilter value={value} onChange={changeHandler} />;
    case "boolean":
    case "select":
      if (col.options === undefined || col.options.length === 0) return null;
      if (typeof value !== "string" && value !== null) {
        console.error(errorTypes);
        return null;
      }
      return <SelectFilter value={value ?? "any"} options={col.options} onChange={changeHandler} />;
    case "number":
      if (typeof value !== "object") {
        console.error(errorTypes);
        return null;
      }
      return <RangeFilter value={value} onChange={changeHandler} />;
    default:
      console.error(errorTypes);
      return null;
  }
}

export const FilterInputMemo = memo(FilterInput) as typeof FilterInput;
