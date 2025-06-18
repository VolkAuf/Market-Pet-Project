import { ChangeEvent } from "react";
import { useCartStore } from "@/shared/model/cartStore";
import { Product } from "@/entities/product";
import styles from "./styles.module.scss";

export const ProductCard = ({ product }: { product: Product }) => {
  const { id, title, description, price, image_url } = product;

  const quantity = useCartStore((s) => s.items.find((i) => i.id === id)?.quantity || 0);
  const addToCart = useCartStore((s) => s.addToCart);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const setToCart = useCartStore((s) => s.setToCart);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      setToCart(id, val);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__imageContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.card__image} src={image_url} alt={title} />
      </div>
      <h3 className={styles.card__title}>{title}</h3>
      <p className={styles.card__description}>{description}</p>
      <div className={styles.card__bottom}>
        <span className={styles.card__price}>{price} ₽</span>
        {quantity === 0 ? (
          <button className={styles.card__buttonBuy} onClick={() => addToCart(product)}>
            В корзину
          </button>
        ) : (
          <div className={styles.card__qtyControlsContainer}>
            <button className={styles.card__qtyButton} onClick={() => decrement(id)}>
              −
            </button>
            <input className={styles.card__qtyInput} type="number" value={quantity} min={0} onChange={onChange} />
            <button className={styles.card__qtyButton} onClick={() => increment(id)}>
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
