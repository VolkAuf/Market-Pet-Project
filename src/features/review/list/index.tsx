"use client";

import DOMPurify from "dompurify";
import { useReviews } from "@/shared/hooks/useReviews";
import styles from "./styles.module.scss";

export const ReviewList = () => {
  const { reviews, isLoading, error } = useReviews();

  if (isLoading) return <div className={styles.loading}>Загрузка отзывов...</div>;
  if (error) return <div className={styles.error}>Ошибка загрузки отзывов</div>;

  return (
    <section className={styles.reviewList}>
      {reviews.map((review) => (
        <div
          key={review.id}
          className={styles.reviewItem}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(review.text),
          }}
        />
      ))}
    </section>
  );
};
