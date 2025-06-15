"use client";
// CheckoutPage
import { useEffect, useState } from "react";
import Link from "next/link";

interface CheckoutItem {
  productId: string;
  title: string;
  lprice: string;
  quantity: number;
}
//  과제 3
export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("checkoutItems");
    if (data) {
      const parsed = JSON.parse(data) as CheckoutItem[];
      setItems(parsed);
      localStorage.removeItem("checkoutItems");
    }
  }, []);

  const total = items.reduce(
    (sum, item) => sum + Number(item.lprice) * item.quantity,
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
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.productId} className="border p-4 rounded">
              <p dangerouslySetInnerHTML={{ __html: item.title }} />
              <p>수량: {item.quantity}</p>
              <p>
                가격: {(Number(item.lprice) * item.quantity).toLocaleString()}원{" "}
              </p>
            </li>
          ))}
          <li className="text-right font-bold text-xl pt-4 border-t">
            총합: {total.toLocaleString()}원
          </li>
        </ul>
      )}

      {/* 3.2. 홈으로 가기 버튼 구현 */}
      <div className="mt-6 text-center">
        <Link href="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            홈으로 가기
          </button>
        </Link>
      </div>
    </div>
  );
}
