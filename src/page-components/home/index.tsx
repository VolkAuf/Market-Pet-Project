import { ProductsList } from "@/features/product/list";
import { Cart } from "@/features/cart";
import { ReviewList } from "@/features/review/list";
import styles from "./styles.module.scss";

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <ReviewList />
      <Cart />
      <ProductsList />
    </div>
  );
};
