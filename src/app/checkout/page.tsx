"use client";

import { useState, useEffect } from "react";
import { ProductItem } from "@/types/Product";

// localStorage에서 가져올 아이템의 타입을 정의합니다.
// ProductItem에 quantity(수량) 속성을 추가합니다.
type CheckoutItem = ProductItem & { quantity: number };

//  과제 3
export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [total, setTotal] = useState(0);

  // 3.1. 결제 완료 페이지 구현
  useEffect(() => {
    // localStorage에서 'checkoutItems' 키로 저장된 데이터를 가져옵니다.
    const storedItems = localStorage.getItem("checkoutItems");

    if (storedItems) {
      // 데이터가 있으면 JSON으로 파싱하여 상태에 저장합니다.
      const parsedItems: CheckoutItem[] = JSON.parse(storedItems);
      setItems(parsedItems);

      // 총 결제 금액을 계산합니다.
      const calculatedTotal = parsedItems.reduce(
        (sum, item) => sum + Number(item.lprice) * item.quantity,
        0
      );
      setTotal(calculatedTotal);

      // 결제 완료 후 localStorage에서 데이터를 즉시 삭제합니다.
      localStorage.removeItem("checkoutItems");
    }
  }, []); // 컴포넌트가 처음 마운트될 때 한 번만 실행합니다.

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-lg mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
        ✅ 결제가 완료되었습니다!
      </h1>

      {items.length > 0 ? (
        <div>
          <ul className="space-y-4 mb-6">
            {items.map((item) => (
              <li
                key={item.productId}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p
                    className="font-semibold text-gray-800"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  ></p>
                  <p className="text-sm text-gray-600">수량: {item.quantity}</p>
                </div>
                <p className="font-bold text-lg text-red-500">
                  {(Number(item.lprice) * item.quantity).toLocaleString()}원
                </p>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold text-xl text-gray-800 border-t-2 border-gray-200 pt-4 mt-4">
            총 결제 금액: {total.toLocaleString()}원
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg py-10">
          결제된 아이템이 없습니다.
        </p>
      )}

      {/* 3.2. 홈으로 가기 버튼 구현 */}
    </div>
  );
}
