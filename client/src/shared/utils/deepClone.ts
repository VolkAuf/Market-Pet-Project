export function deepClone<T>(v: T): T {
  if (typeof structuredClone === "function") return structuredClone(v);
  try {
    return JSON.parse(JSON.stringify(v));
  } catch {
    return v;
  }
}
