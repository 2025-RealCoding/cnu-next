"use client";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { ProductItem } from "@/types/Product";
import CartList from "./CartList";
import { useRouter } from "next/navigation";

export default function ProductCart({ items }: { items: ProductItem[] }) {
  const [cart, setCart] = useState<{ [id: string]: number }>({}); // {"88159814281" : 1}
  const [showCart, setShowCart] = useState(false); //  과제 2.1
  const router = useRouter();

  // 2.1. 장바구니에 아이템이 없을 때, 장바구니 영역이 보이지 않는 기능
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
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  // 2.4. 결제하기 기능
  const handleCheckout = () => {
    // 장바구니에 담긴 item 객체들 찾기
    const cartItems = Object.entries(cart)
      .map(([id, quantity]) => {
        const product = items.find((p) => p.productId === id);
        if (!product) return null;
        
        // 필수 프로퍼티만 포함하여 저장
        return {
          productId: product.productId,
          title: product.title,
          lprice: product.lprice,
          quantity: quantity
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    // localStorage에 저장
    localStorage.setItem("checkoutItems", JSON.stringify(cartItems));
    
    // 결제완료 페이지로 이동
    router.push("/checkout");
  };

  return (
    <div className="p-10">
      {/* 상품 리스트 */}
      <ProductList items={items} onAddToCart={handleAddToCart} />
      {/* 장바구니 */}
      {/* 2.1. 조건부 카트 보이기: 카트에 담긴 상품이 없으면 카트가 보이지 않고, 카트에 담긴 물건이 있으면 카트가 보인다 */}
      {showCart && (
        <CartList
          cart={cart}
          products={items}
          onRemove={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
}
