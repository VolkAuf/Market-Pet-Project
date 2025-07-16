import { Review } from "@/entities/review";

export async function fetchReviews(): Promise<Review[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`);
  if (!res.ok) {
    throw new Error(`Failed to fetchReviews with response: ${res}`);
  }
  return res.json();
}
