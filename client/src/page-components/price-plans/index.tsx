"use client";

import { pricePlansColumns } from "@/entities/price-plans/columns";
import { TableController } from "@/features/table-controller/TableController";
import { useStore } from "@/store/useStore";
import type { PricePlans } from "@/entities/price-plans/types";

export const PricePlansPage = () => {
  const pricePlans = useStore((s) => s.pricePlans);
  const updatePricePlans = useStore((s) => s.updatePricePlans);

  return <TableController<PricePlans> rows={pricePlans} columns={pricePlansColumns} updateRow={updatePricePlans} />;
};
