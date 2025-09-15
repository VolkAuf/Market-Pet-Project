import type { BaseTypes } from "@/shared/utils/types";

export function getNestedValue<T = BaseTypes>(obj: unknown, path: string): T | undefined {
  if (obj == null) return undefined;
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc == null) return undefined;
    return acc[key as keyof typeof acc];
  }, obj) as T | undefined;
}

export function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

export function setNestedImmutable<T extends Record<string, unknown>>(obj: T, path: string, value: unknown): T {
  const parts = path.split(".");
  const last = parts.pop();
  if (!last) {
    return obj;
  }
  const root = { ...(obj ?? {}) };
  let cur: Record<string, unknown> = root;
  for (const p of parts) {
    const next = cur[p];
    const nextObj = isRecord(next) ? { ...next } : {};
    cur[p] = nextObj;
    cur = nextObj;
  }
  cur[last] = value;
  return root;
}
