export type ApiResponse<T> = {
  isSuccess: boolean;
  error?: string;
  data?: T;
};

export async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);

  if (!res.ok) {
    throw new Error(`Fetch failed with status ${res.status}`);
  }

  const result = (await res.json()) as ApiResponse<T>;

  if (!result.isSuccess) {
    throw new Error(result.error ?? "Unknown API error");
  }

  return result.data as T;
}
