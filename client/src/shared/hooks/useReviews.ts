import useSWR from "swr";
import { fetchReviews } from "@/shared/api/review";

export function useReviews() {
  const { data, error, isLoading } = useSWR("reviews", fetchReviews, {
    revalidateOnFocus: false,
  });

  return {
    reviews: data ?? [],
    error,
    isLoading,
  };
}
