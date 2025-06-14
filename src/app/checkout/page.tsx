"use client";
import { useEffect, useState } from "react";
import { ProductItem } from "@/types/Product";
import Link from "next/link";
import Header from "@/component/layout/Header";

interface CheckoutItem extends ProductItem {
  quantity: number;
}

export default function Checkout() {
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);

  useEffect(() => {
    const items = localStorage.getItem("checkoutItems");
    if (items) {
      setCheckoutItems(JSON.parse(items));
      localStorage.removeItem("checkoutItems");
    }
  }, []);

  const total = checkoutItems.reduce(
    (sum, item) => sum + Number(item.lprice) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="결제 완료" />
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">결제 내역</h2>
          {checkoutItems.length === 0 ? (
            <p className="text-gray-500">결제된 아이템이 없습니다.</p>
          ) : (
            <>
              <ul className="space-y-4">
                {checkoutItems.map((item) => (
                  <li key={item.productId} className="border-b pb-4">
                    <h3
                      className="font-bold"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <p className="text-sm text-gray-600">
                      수량: {item.quantity}개
                    </p>
                    <p className="text-red-500 font-bold">
                      {(Number(item.lprice) * item.quantity).toLocaleString()}원
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-right font-bold text-xl">
                총 결제 금액: {total.toLocaleString()}원
              </div>
            </>
          )}
          <div className="mt-8">
            <Link
              href="/"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              홈으로 가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
