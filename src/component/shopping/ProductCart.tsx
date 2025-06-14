// ProductCartPage.tsx
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { ProductItem } from "@/types/Product";
import CartList from "./CartList";

export default function ProductCart({ items }: { items: ProductItem[] }) {
  const [cart, setCart] = useState<{ [id: string]: number }>({}); // {"88159814281" : 1}
  const [showCart, setShowCart] = useState(false); //  과제 2.1

  // 과제 2.1: cart 상태가 변경될 때마다 showCart 상태를 업데이트합니다.
  useEffect(() => {
    // cart 객체에 상품이 하나 이상 있는지 확인합니다.
    const hasItemsInCart = Object.keys(cart).length > 0;
    setShowCart(hasItemsInCart);
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
  const handleRemoveFromCart = () => {};

  return (
    <div className="p-10">
      {/* 상품 리스트 */}
      <ProductList items={items} onAddToCart={handleAddToCart} />

      {/* 장바구니 */}
      {/* 2.1. 조건부 카트 보이기: showCart가 true일 때만 CartList를 렌더링합니다. */}
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
