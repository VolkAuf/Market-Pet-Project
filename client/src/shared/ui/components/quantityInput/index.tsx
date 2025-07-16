type QuantityInputProps = {
  value: number;
  min?: number;
  onChange: (value: number) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  isSmall: boolean;
};

export const QuantityInput = ({ value, min = 0, onChange, onIncrement, onDecrement, isSmall }: QuantityInputProps) => {
  const grayClass = isSmall ? "gray-container-sm max-w-18" : "gray-container";

  return (
    <div className="flex flex-row items-center justify-evenly w-full">
      <button className={`${grayClass} cursor-pointer`} onClick={onDecrement} aria-label="Уменьшить">
        −
      </button>
      <input
        className={`${grayClass} text-center max-w-32 cursor-text`}
        type="number"
        value={value}
        min={min}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      />
      <button className={`${grayClass} cursor-pointer`} onClick={onIncrement} aria-label="Увеличить">
        +
      </button>
    </div>
  );
};
