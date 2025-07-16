"use client";

import DOMPurify from "dompurify";
import { useReviews } from "@/shared/hooks/useReviews";
import { Loader } from "@/shared/ui/components/loader";

export const ReviewList = () => {
  const { reviews, isLoading, error } = useReviews();

  return (
    <section
      className="
        grid justify-items-center
        grid-cols-1 max-mobile:grid-cols-1 max-md:grid-cols-1
        md:grid-cols-2 desktop:grid-cols-3
        gap-6 md:gap-8
        mb-41 md:mb-60 w-full
      "
    >
      <Loader text={"Загрузка отзывов..."} isActive={isLoading} />
      <Loader text={"Ошибка загрузки отзывов"} isActive={error} />
      {reviews.map((review) => (
        <div
          key={review.id}
          className="
            bg-gray-d9 rounded-3 py-6 px-5
            text-black break-words w-full
            md:px-7 md:max-w-117
          "
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(review.text),
          }}
        />
      ))}
    </section>
  );
};
