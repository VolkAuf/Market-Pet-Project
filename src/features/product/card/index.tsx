import { useCartStore } from "@/shared/model/cartStore";
import { Product } from "@/entities/product";
import styles from "./styles.module.scss";
import { ProductControlPanel } from "@/features/product/controlPanel";

export const ProductCard = ({ product }: { product: Product }) => {
  const { id, title, description, price, image_url } = product;

  const { addToCart } = useCartStore();
  const quantity = useCartStore((s) => s.items.find((i) => i.id === id)?.quantity || 0);

  return (
    <div className={styles.card}>
      <div className={styles.card__imageContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.card__image} src={image_url} alt={title} />
      </div>
      <h3 className={styles.card__title}>{title}</h3>
      <p className={styles.card__description}>{description}</p>
      <div className={styles.card__bottom}>
        <span className={styles.card__price}>Цена: {price} ₽</span>
        <div className={styles.card__buttons}>
          {quantity === 0 ? (
            <button className={styles.card__buttonBuy} onClick={() => addToCart(product)}>
              В корзину
            </button>
          ) : (
            <ProductControlPanel id={id} />
          )}
        </div>
      </div>
    </div>
  );
};
