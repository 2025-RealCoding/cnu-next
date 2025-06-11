// CheckoutPage
"use client"

import { useEffect, useState } from "react";
//import { ProductItem } from "@/types/Product";
import { useRouter } from "next/navigation";

interface CheckoutItem {
  productId: string;
  title: string;
  lprice: string;
  quantity: number;
}
//  과제 3
export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    // localStorage에서 저장된 결제 아이템 불러오기
    const stored = localStorage.getItem("checkoutItems");
    if (stored) {
      try {
        const parsed: CheckoutItem[] = JSON.parse(stored);
        setItems(parsed);
        // 결제 완료 후 localStorage 비우기
        localStorage.clear();
      } catch (e) {
        console.error("checkoutItems parsing error:", e);
      }
    }
  }, []);

  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.lprice) * item.quantity,
    0
  );
  
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">✅ 결제가 완료되었습니다!</h1>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center">결제된 아이템이 없습니다.</p>
      ) : (
        <div>
          <ul className="space-y-4 mb-4">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between font-bold">
                <div>
                  <p dangerouslySetInnerHTML={{ __html: item.title }}></p>
                  <p className="text-sm text-gray-500">수량: {item.quantity}</p>
                </div>
                <p className="font-bold text-red-600">
                  {(Number(item.lprice) * item.quantity).toLocaleString()}원
                </p>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold text-lg">
            총 결제 금액: {totalPrice.toLocaleString()}원
          </div>
        </div>
      )}

      <div className="flex justify-start mt-6">
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          홈으로 가기
        </button>
      </div>
    </div>
  );
}