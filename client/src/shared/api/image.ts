import { fetchJson } from "@/shared/api/utils/fetchJson";

export async function fetchRandomImg(productName: string): Promise<string> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/images/random?query=${productName}`;
  return fetchJson<string>(url);
}
