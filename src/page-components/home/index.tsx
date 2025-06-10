import styles from "./styles.module.scss";
import { ProductsList } from "@/features/product/list";

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <ProductsList />
    </div>
  );
};
