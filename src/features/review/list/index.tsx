"use client";

import DOMPurify from "dompurify";
import { useReviews } from "@/shared/hooks/useReviews";
import { Loader } from "@/shared/ui/components/loader";
import styles from "./styles.module.scss";

export const ReviewList = () => {
  const { reviews, isLoading, error } = useReviews();

  return (
    <section className={styles.reviewList}>
      <Loader text={"Загрузка отзывов..."} isActive={isLoading} />
      <Loader text={"Ошибка загрузки отзывов"} isActive={error} />
      {reviews.map((review) => (
        <div
          key={review.id}
          className={styles.reviewList__item}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(review.text),
          }}
        />
      ))}
    </section>
  );
};
