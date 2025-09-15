import { BooleanFilterValues, type Column } from "@/features/table/types";
import type { PricePlans } from "@/entities/price-plans/types";

export const pricePlansColumns: Column<PricePlans>[] = [
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
    key: "description",
    header: "Description",
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
    key: "createdAt",
    header: "Created",
    type: "date",
    sortable: true,
    filterable: true,
    filterType: "date",
    editable: true,
  },
  {
    key: "removedAt",
    header: "Removed",
    type: "date",
    sortable: true,
    filterable: true,
    filterType: "date",
    editable: true,
  },
];
