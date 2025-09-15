"use client";

import { pagesColumns } from "@/entities/pages/columns";
import { TableController } from "@/features/table-controller/TableController";
import { useStore } from "@/store/useStore";
import type { Pages } from "@/entities/pages/types";

export const HomePage = () => {
  const pages = useStore((s) => s.pages);
  const updatePages = useStore((s) => s.updatePages);

  return <TableController<Pages> rows={pages} columns={pagesColumns} updateRow={updatePages} />;
};
