import { useRouter } from "next/navigation";
import { useCartStore } from "@/shared/model/cartStore";
import { Product } from "@/entities/product";
import { ProductControlPanel } from "@/features/product/controlPanel";
import { Trash2, Pencil } from "lucide-react";
import { deleteProduct } from "@/shared/api/product";

type ProductCardProps = {
  product: Product;
  onProductChange: () => void;
};

export const ProductCard = ({ product, onProductChange }: ProductCardProps) => {
  const router = useRouter();
  const { id, name, description, price, imageUrl, article } = product;

  const { addToCart } = useCartStore();
  const quantity = useCartStore((s) => s.items.find((i) => i.id === id)?.quantity || 0);

  const handleDelete = async () => {
    const confirmed = window.confirm("Удалить продукт?");
    if (!confirmed) return;
    try {
      await deleteProduct(id!);
      alert("Продукт удалён");
      onProductChange();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Неизвестная ошибка";
      console.error("Ошибка удаления:", message);
      alert(`Ошибка удаления: ${message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-300 text-black text-center font-normal rounded p-2.5 w-xs sm:w-full">
      <div className="relative w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="w-full h-auto object-cover rounded" src={imageUrl} alt={name} />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => router.push(`/product/${id}`)}
            className="bg-white/70 p-1 rounded hover:bg-white transition"
            title="Редактировать"
          >
            <Pencil size={18} className="text-black" />
          </button>
          <button
            onClick={handleDelete}
            className="bg-white/70 p-1 rounded hover:bg-red-100 transition"
            title="Удалить"
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>
      <h3 className="font-medium text-4xl">Артикул: {article}</h3>
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
            <ProductControlPanel id={id!} />
          )}
        </div>
      </div>
    </div>
  );
};
