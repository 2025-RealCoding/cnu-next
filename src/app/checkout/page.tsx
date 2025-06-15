// CheckoutPage
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductItem } from "@/types/Product";

interface CheckoutItem {
  productId: string;
  title: string;
  lprice: string;
  quantity: number;
}

// 과제 3
export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const router = useRouter();

  // 3.1. 결제하기 구현: localStorage에서 불러오기
  useEffect(() => {
    const data = localStorage.getItem("checkoutItems");
    if (data) {
      setItems(JSON.parse(data));
    }
  }, []);

  const total = items.reduce(
    (sum, item) => sum + Number(item.lprice) * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">결제가 완료되었습니다!</h1>

      {/* 3.1. 결제 목록 렌더링 */}
      <ul className="space-y-4 mb-6">
        {items.map((item) => (
          <li key={item.productId} className="border-b pb-2">
            <p dangerouslySetInnerHTML={{ __html: item.title }}></p>
            <p className="text-sm text-gray-600">
              수량: {item.quantity}개 / 개당 {Number(item.lprice).toLocaleString()}원
            </p>
            <p className="font-bold">
              소계: {(Number(item.lprice) * item.quantity).toLocaleString()}원
            </p>
          </li>
        ))}
      </ul>

      <div className="text-right font-bold text-lg mb-6">
         총 합계: {total.toLocaleString()}원
      </div>

      {/* 3.2. 홈으로 가기 버튼 구현 */}
      <div className="text-center">
        <button
          onClick={() => router.push("/search")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          홈으로 가기
        </button>
      </div>
    </div>
  );
}
