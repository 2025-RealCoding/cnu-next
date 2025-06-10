// CheckoutPage
"use client"; 

import { useState, useEffect } from "react";
import { ProductItem } from "@/types/Product";

interface CheckoutItem {
  product: ProductItem;
  quantity: number;
}
//  과제 3
export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("checkoutItems");
    if (storedItems) {
      const parsedItems: CheckoutItem[] = JSON.parse(storedItems);
      setItems(parsedItems);
      parsedItems.forEach((item) => {
        localStorage.removeItem(item.product.productId);
      });
      localStorage.removeItem("checkoutItems");
    }
  }, []);

  const total = items.reduce(
    (sum, item) => sum + Number(item.product.lprice) * item.quantity,
    0
  );
  
  // 3.1. 결제하기 구현
  return (
      <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
        <h1 className="text-2xl font-bold mb-4">✅ 결제가 완료되었습니다!</h1>
        
        {/* 3.1. 결제하기 구현 */}
        {items.length === 0 ? (
          <p className="text-gray-500">결제된 아이템이 없습니다</p>
        ) : (
          <>
            <ul className="space-y-4 mb-6">
              {items.map((item, index) => (
                <li key={index} className="border-b pb-2">
                  <p
                    className="font-medium"
                    dangerouslySetInnerHTML={{ __html: item.product.title }}
                  ></p>
                  <p className="text-sm text-gray-600">
                    수량: {item.quantity}개 / 가격:{" "}
                    {(Number(item.product.lprice) * item.quantity).toLocaleString()}원
                  </p>
                </li>
              ))}
            </ul>
            <div className="text-right font-bold text-lg">
              총 결제 금액: {total.toLocaleString()}원
            </div>
          </>
        )}
      {/* 3.2. 홈으로 가기 버튼 구현 */}
      <div className="mt-6 text-center">
        <a
          href="/"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          홈으로 가기
        </a>
      </div>
      </div>
    );
}
