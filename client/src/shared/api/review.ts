import { Review } from "@/entities/review";
import { fetchJson } from "@/shared/api/utils/fetchJson";

export async function fetchReviews(): Promise<Review[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/reviews`;
  return fetchJson<Review[]>(url);
}
