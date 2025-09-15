import type { WithId } from "@/features/table/types";

export type Pages = WithId & {
  title: string;
  active: boolean;
  updatedAt: string;
  publishedAt: string;
};
