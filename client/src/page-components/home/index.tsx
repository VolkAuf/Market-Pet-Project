import { Cart } from "@/features/cart";
import { ReviewList } from "@/features/review/list";
import { ProductsList } from "@/features/product/list";
import Link from "next/link";

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <ReviewList />
      <Cart />
      <div className="w-full flex justify-center mb-4">
        <Link href="/product/new">
          <button className="bg-green-600 text-white px-4 py-2 rounded">Создать товар</button>
        </Link>
      </div>
      <ProductsList />
    </div>
  );
};
