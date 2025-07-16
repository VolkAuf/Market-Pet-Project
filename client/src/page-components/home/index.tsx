import { Cart } from "@/features/cart";
import { ReviewList } from "@/features/review/list";
import { ProductsList } from "@/features/product/list";
import Link from "next/link";

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-screen-lg flex justify-end mb-4">
        <Link className="gray-container" href="/productForm">
          Создать продукт
        </Link>
      </div>
      <ReviewList />
      <Cart />
      <ProductsList />
    </div>
  );
};
