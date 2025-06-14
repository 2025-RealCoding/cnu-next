"use client";

import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import CartList from "./CartList";
import { ProductItem } from "@/types/Product";

export default function ProductCart({ items }: { items: ProductItem[] }) {
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [showCart, setShowCart] = useState(false); 

  //  2.1 - cart가 변할 때마다 showCart 업데이트
  useEffect(() => {
    setShowCart(Object.keys(cart).length > 0);
  }, [cart]);

  //  상품 담기
  const handleAddToCart = (item: ProductItem, quantity: number) => {
    setCart((prev) => ({
      ...prev,
      [item.productId]: quantity,
    }));

    localStorage.setItem(item.productId, quantity.toString());
  };

  //  2.3 - 장바구니 항목 제거
  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });

    localStorage.removeItem(productId);
  };

  return (
    <div className="p-10">
      {/* 상품 리스트 */}
      <ProductList items={items} onAddToCart={handleAddToCart} />

      {/*  2.1 - 조건부 렌더링 */}
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

