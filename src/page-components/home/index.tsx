import styles from "./styles.module.scss";
import { ProductsList } from "@/features/product/list";
import { Cart } from "@/features/cart";

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Cart />
      <ProductsList />
    </div>
  );
};
