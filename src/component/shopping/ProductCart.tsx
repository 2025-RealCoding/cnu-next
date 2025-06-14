// ProductCartPage.tsx
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { ProductItem } from "@/types/Product";
import CartList from "./CartList";

export default function ProductCart({ items }: { items: ProductItem[] }) {
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const hasItemsInCart = Object.keys(cart).length > 0;
    setShowCart(hasItemsInCart);
  }, [cart]);

  const handleAddToCart = (item: ProductItem, quantity: number) => {
    setCart((prev) => ({
      ...prev,
      [item.productId]: quantity,
    }));

    // 로컬 스토리지에 아이템 저장
    localStorage.setItem(item.productId, quantity + "");
  };

  /* 과제 2.3: Cart 아이템 지우기 */
  const handleRemoveFromCart = (productId: string) => {
    // 1. cart 상태 업데이트
    setCart((prevCart) => {
      // 이전 cart 상태를 복사
      const newCart = { ...prevCart };
      // 특정 productId를 가진 속성을 삭제
      delete newCart[productId];
      return newCart;
    });

    // 2. localStorage에서 아이템 삭제
    localStorage.removeItem(productId);
  };

  return (
    <div className="p-10">
      <ProductList items={items} onAddToCart={handleAddToCart} />

      {showCart && (
        <CartList
          cart={cart}
          products={items}
          onRemove={handleRemoveFromCart}
        />
      )}
    </div>
  );
}
