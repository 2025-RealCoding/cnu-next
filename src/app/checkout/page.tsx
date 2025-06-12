"use client";
// CheckoutPage
import { useEffect, useState } from "react";
import { ProductItem } from "@/types/Product";
import Link from "next/link";

interface CheckoutItem extends ProductItem {
  quantity: number;
}
//  과제 3
export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const orderedItemsString = localStorage.getItem("order");

    if (orderedItemsString) {
      const orderedItems: CheckoutItem[] = JSON.parse(orderedItemsString);
      setItems(orderedItems);

      const calculatedTotal = orderedItems.reduce(
        (sum, item) => sum + Number(item.lprice) * item.quantity,
        0
      );
      setTotal(calculatedTotal);

      localStorage.removeItem("order");
    }
  }, 
  []);
  // 3.1. 결제하기 구현
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">✅ 결제가 완료되었습니다!</h1>
      {/* 3.1. 결제하기 구현 */}
      
      {items.length > 0 ? (
        <div className="space-y-4">
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.productId} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold" dangerouslySetInnerHTML={{ __html: item.title }} />
                  <p className="text-sm text-gray-500">
                    {Number(item.lprice).toLocaleString()}원 x {item.quantity}개
                  </p>
                </div>
                <p className="font-bold text-lg">
                  {(Number(item.lprice) * item.quantity).toLocaleString()}원
                </p>
              </li>
            ))}
          </ul>

          <div className="text-right font-extrabold text-xl mt-6 pt-4 border-t">
            총 결제 금액: <span className="text-red-500">{total.toLocaleString()}원</span>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">결제된 아이템이 없습니다.</p>
      )}
      
      {/* 3.2. 홈으로 가기 버튼 구현 */}
      <div className="mt-8 text-center">
        <Link href="/">
          <button className="w-full max-w-xs px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition">
            홈 화면으로 돌아가기
          </button>
        </Link>
      </div>
    </div>
  );
}
