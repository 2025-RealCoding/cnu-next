// CheckoutPage
"use client";
import { useState, useEffect } from "react";
import { ProductItem } from "@/types/Product";
import Link from "next/link";

interface CheckoutItem {
  product: ProductItem;
  quantity: number;
}
//  과제 3
export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("checkoutItems");
    if (data) {
      const parsed: CheckoutItem[] = JSON.parse(data);
      setItems(parsed);
      parsed.forEach((item) => {
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
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow mt-10 border border-gray-200">
      <h1 className="text-xl font-semibold text-green-600 mb-6">✅ 결제가 완료되었습니다!</h1>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center">결제된 아이템이 없습니다.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {items.map((item, idx) => (
            <li key={idx} className="py-4 flex justify-between items-start">
              <div className="flex-1">
                <p
                  className="font-medium text-gray-900 leading-snug"
                  dangerouslySetInnerHTML={{ __html: item.product.title }}
                />
                <p className="text-sm text-gray-500 mt-1">수량: {item.quantity}</p>
              </div>
              <p className="text-red-600 font-semibold text-right whitespace-nowrap ml-4">
                {(Number(item.product.lprice) * item.quantity).toLocaleString()}원
              </p>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="text-right font-bold text-lg mt-6">
          총 결제 금액:{" "}
          <span className="text-black">{total.toLocaleString()}원</span>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Link
          href="/"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
