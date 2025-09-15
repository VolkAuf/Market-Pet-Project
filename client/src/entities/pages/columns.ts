import { BooleanFilterValues, type Column } from "@/features/table/types";
import type { Pages } from "@/entities/pages/types";

export const pagesColumns: Column<Pages>[] = [
  {
    key: "id",
    header: "ID",
    type: "number",
    sortable: true,
    filterable: false,
    filterType: "number",
    editable: false,
  },
  {
    key: "title",
    header: "Title",
    type: "text",
    sortable: true,
    filterable: true,
    filterType: "text",
    editable: true,
  },
  {
    key: "active",
    header: "Active",
    type: "boolean",
    sortable: true,
    filterable: true,
    filterType: "boolean",
    options: [...BooleanFilterValues],
    editable: true,
  },
  {
    key: "updatedAt",
    header: "Updated",
    type: "date",
    sortable: true,
    filterable: true,
    filterType: "date",
    editable: true,
  },
  {
    key: "publishedAt",
    header: "Published",
    type: "date",
    sortable: true,
    filterable: true,
    filterType: "date",
    editable: true,
  },
];
