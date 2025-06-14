"use client";

import { useEffect, useState } from "react";
import { ProductItem } from "@/types/Product";
import Link from "next/link";

interface CheckoutItem {
  productId: string;
  title: string;
  lprice: string;
  quantity: number;
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[] | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("checkoutItems");
    if (data) {
      const parsed = JSON.parse(data);
      setItems(parsed);
      localStorage.removeItem("checkoutItems"); // 결제 완료 후 삭제
    } else {
      setItems(null); // 아무것도 없음
    }
  }, []);

  const total = items
    ? items.reduce(
        (sum, item) => sum + Number(item.lprice) * item.quantity,
        0
      )
    : 0;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6 space-y-4">
      <h1 className="text-2xl font-bold">✅ 결제가 완료되었습니다!</h1>

      {items && items.length > 0 ? (
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between border-b pb-2 text-sm"
            >
              <div dangerouslySetInnerHTML={{ __html: item.title }} />
              <div>
                {item.quantity}개 x {Number(item.lprice).toLocaleString()}원
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-lg mt-4">
            총 합계: {total.toLocaleString()}원
          </div>
        </div>
      ) : (
        <p className="text-gray-500">결제된 아이템이 없습니다</p>
      )}

      {/* 3.2 홈으로 가기 버튼 */}
      <div className="text-center mt-6">
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
