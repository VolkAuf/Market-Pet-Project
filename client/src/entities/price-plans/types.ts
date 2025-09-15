import type { WithId } from "@/features/table/types";

export type PricePlans = WithId & {
  description: string;
  active: boolean;
  createdAt: string;
  removedAt: string;
};
