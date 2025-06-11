// CheckoutPage
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductItem } from "@/types/Product";

interface CheckoutItem {
  product: ProductItem;
  quantity: number;
}

//  과제 3
export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const router = useRouter();

  // 3.1: localStorage에서 꺼내서 보여주고, 삭제
  useEffect(() => {
    const raw = localStorage.getItem("checkoutItems");
    if (raw) {
      setItems(JSON.parse(raw));
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
        <p className="text-gray-500">결제된 아이템이 없습니다.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map(({ product, quantity }) => (
              <li
                key={product.productId}
                className="flex justify-between items-center"
              >
                <div>
                  <p
                    className="font-medium"
                    dangerouslySetInnerHTML={{ __html: product.title }}
                  />
                  <p className="text-sm text-gray-500">수량: {quantity}</p>
                </div>
                <p className="text-red-500 font-bold">
                  {(Number(product.lprice) * quantity).toLocaleString()}원
                </p>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold text-lg mt-4">
            총 합계: {total.toLocaleString()}원
          </div>
        </>
      )}
      {/* 3.2. 홈으로 가기 버튼 구현 */}
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        홈으로 가기
      </button>
    </div>
  );
}
