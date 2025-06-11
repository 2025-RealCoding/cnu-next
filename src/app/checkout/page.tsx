"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductItem } from "@/types/Product";

interface CheckoutItem extends ProductItem {
  quantity: number;
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("checkout");
    if (raw) {
      setItems(JSON.parse(raw));
      localStorage.removeItem("checkout");
    }
  }, []);

  const total = items.reduce(
    (sum, v) => sum + Number(v.lprice) * v.quantity,
    0
  );

  if (items.length === 0)
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <p>결제된 아이템이 없습니다.</p>
        <Link href="/" className="mt-4 text-blue-600 underline">
          홈으로 가기
        </Link>
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">✅ 결제가 완료되었습니다!</h1>

      <ul className="space-y-4">
        {items.map((it) => (
          <li key={it.productId} className="flex justify-between">
            <div>
              <p dangerouslySetInnerHTML={{ __html: it.title }} />
              <p className="text-sm text-gray-500">수량: {it.quantity}</p>
            </div>
            <p className="text-red-500 font-bold">
              {(Number(it.lprice) * it.quantity).toLocaleString()}원
            </p>
          </li>
        ))}
      </ul>

      <div className="text-right font-bold text-lg mt-4">
        총 결제 금액: {total.toLocaleString()}원
      </div>

      <Link
        href="/"
        className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        홈으로 가기
      </Link>
    </div>
  );
}
