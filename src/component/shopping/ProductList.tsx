import ProductCard from "./ProductCard";
import { ProductItem } from "@/types/Product";

export default function ProductList({
  items,
  onAddToCart,
}: {
  items: ProductItem[];
  onAddToCart: (item: ProductItem, quantity: number) => void;
}) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <ProductCard
          key={item.productId}
          item={item}
          onAddToCart={onAddToCart}
        />
      ))}
    </ul>
  );
}