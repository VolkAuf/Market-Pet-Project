import { useCartStore } from "@/shared/model/cartStore";
import { Product } from "@/entities/product";
import { ProductControlPanel } from "@/features/product/controlPanel";

export const ProductCard = ({ product }: { product: Product }) => {
  const { id, name, description, price, image_url } = product;

  const { addToCart } = useCartStore();
  const quantity = useCartStore((s) => s.items.find((i) => i.id === id)?.quantity || 0);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-300 text-black text-center font-normal rounded p-2.5 w-xs sm:w-full">
      <div className="relative w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="w-full h-auto object-cover rounded" src={image_url} alt={name} />
      </div>
      <h3 className="font-medium text-4xl">{name}</h3>
      <p className="text-left text-2xl text-black">{description}</p>
      <div className="flex flex-col items-center justify-center mt-auto w-full">
        <span className="text-4xl">Цена: {price} ₽</span>
        <div className="flex items-center justify-evenly flex-row w-full">
          {quantity === 0 ? (
            <button className="gray-container w-full cursor-pointer" onClick={() => addToCart(product)}>
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
