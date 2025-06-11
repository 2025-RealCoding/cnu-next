// ProductCartPage.tsx
import { useEffect, useState } from "react";
import ProductList from "./ProductList";

import { ProductItem } from "@/types/Product";
import CartList from "./CartList";


export default function ProductCart({ items }: { items: ProductItem[] }) {
  const [cart, setCart] = useState<{ [id: string]: number }>({}); // {"88159814281" : 1}
  const [showCart, setShowCart] = useState(false); //  과제 2.1

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
  // 1. cart 객체에서 해당 productId만 제거
  const newCart = Object.entries(cart)
    .filter(([id, _]) => id !== productId) // 남길 것만 필터
    .reduce((acc, [id, quantity]) => {
      acc[id] = quantity;
      return acc;
    }, {} as { [id: string]: number });

  // 2. cart 상태 업데이트
  setCart(newCart);

  // 3. localStorage에서도 제거
  localStorage.removeItem(productId);
};

  /*조건부 카트 보이기 기능 */
  useEffect(() => {
  setShowCart(Object.keys(cart).length > 0);
}, [cart]);

  return (
    <div className="p-10">
      {/* 상품 리스트 */}
      <ProductList items={items} onAddToCart={handleAddToCart} />
      {/* 장바구니 */}
      {/* 2.1. 조건부 카트 보이기: 카트에 담긴 상품이 없으면 카트가 보이지 않고, 카트에 담긴 물건이 있으면 카트가 보인다 */}
      {showCart && (
        <CartList cart={cart} products={items} onRemove={handleRemoveFromCart} />
      )}
    </div>
  );
}