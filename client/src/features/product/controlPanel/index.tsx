import { useCartStore } from "@/shared/model/cartStore";
import { QuantityInput } from "@/shared/ui/components/quantityInput";

type QuantityInputProps = {
  id: number;
  isSmall?: boolean;
};

export const ProductControlPanel = ({ id, isSmall = false }: QuantityInputProps) => {
  const { increment, decrement, setToCart } = useCartStore();
  const quantity = useCartStore((s) => s.items.find((i) => i.id === id)?.quantity || 0);

  const onChange = (value: number) => {
    if (!isNaN(value)) {
      setToCart(id, value);
    } else {
      setToCart(id, 0);
    }
  };

  return (
    <QuantityInput
      value={quantity}
      onChange={onChange}
      onIncrement={() => increment(id)}
      onDecrement={() => decrement(id)}
      isSmall={isSmall}
    />
  );
};
