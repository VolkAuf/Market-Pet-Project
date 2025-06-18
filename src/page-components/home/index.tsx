import { ProductsList } from "@/features/product/list";
import { Cart } from "@/features/cart";
import styles from "./styles.module.scss";

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Cart />
      <ProductsList />
    </div>
  );
};
