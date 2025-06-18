import styles from "./styles.module.scss";

type QuantityInputProps = {
  value: number;
  min?: number;
  onChange: (value: number) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  isSmall: boolean;
};

export const QuantityInput = ({ value, min = 0, onChange, onIncrement, onDecrement, isSmall }: QuantityInputProps) => {
  const grayContainerName = isSmall ? styles.quantityInput__grayContainerSmall : styles.quantityInput__grayContainer;

  return (
    <div className={styles.quantityInput}>
      <button
        className={`${styles.quantityInput__button} ${grayContainerName}`}
        onClick={onDecrement}
        aria-label="Уменьшить"
      >
        −
      </button>
      <input
        className={`${styles.quantityInput__input} ${grayContainerName}`}
        type="number"
        value={value}
        min={min}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      />
      <button
        className={`${styles.quantityInput__button} ${grayContainerName}`}
        onClick={onIncrement}
        aria-label="Увеличить"
      >
        +
      </button>
    </div>
  );
};
