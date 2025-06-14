"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProductItem } from "@/types/Product";

type CheckoutItem = ProductItem & { quantity: number };

//  과제 3
export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedItems = localStorage.getItem("checkoutItems");
    if (storedItems) {
      const parsedItems: CheckoutItem[] = JSON.parse(storedItems);
      setItems(parsedItems);

      const calculatedTotal = parsedItems.reduce(
        (sum, item) => sum + Number(item.lprice) * item.quantity,
        0
      );
      setTotal(calculatedTotal);
      localStorage.removeItem("checkoutItems");
    }
  }, []);

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
      <div className="mt-10 flex justify-center">
        <Link href="/">
          <button className="w-full max-w-xs px-6 py-3 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1">
            홈으로 가기
          </button>
        </Link>
      </div>
    </div>
  );
}
