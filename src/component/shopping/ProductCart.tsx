// ProductCartPage.tsx
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { ProductItem } from "@/types/Product";
import CartList from "./CartList";

export default function ProductCart({ items }: { items: ProductItem[] }) {
  const [cart, setCart] = useState<{ [id: string]: number }>({}); // {"88159814281" : 1}
  const [showCart, setShowCart] = useState(false); //  과제 2.1

  useEffect(() => {
    setShowCart(Object.keys(cart).length > 0);
  }, [cart]);

  //  카트에 담기
  const handleAddToCart = (item: ProductItem, quantity: number) => {
    setCart((prev) => ({
      ...prev,
      [item.productId]: quantity,
    }));

    localStorage.setItem(item.productId, quantity + "");
    localStorage.getItem(item.productId);
  };

  /* 과제 2-3: Cart 아이템 지우기 */
  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      localStorage.removeItem(productId);
      return newCart;
    });
  };

  return (
    <div className="p-10">
      {items.length > 0 ? (
        <ProductList items={items} onAddToCart={handleAddToCart} />
      ) : (
        <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
      )}

      {showCart && (
        <CartList cart={cart} products={items} onRemove={handleRemoveFromCart} />
      )}
    </div>
  );
}
