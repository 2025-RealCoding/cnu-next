"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CheckoutItem = {
  productId: string;
  title: string;
  lprice: string;
  quantity: number;
};

export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("checkoutItems");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.length > 0) {
        setItems(parsed);
        localStorage.removeItem("checkoutItems"); //  결제 후 localStorage 비우기
      }
    }
  }, []);

  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.lprice) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center"> 결제 완료</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          결제된 아이템이 없습니다.
        </p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p
                  className="font-semibold"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                ></p>
                <p className="text-sm text-gray-500">
                  수량: {item.quantity}개
                </p>
              </div>
              <p className="font-bold text-red-600">
                {(Number(item.lprice) * item.quantity).toLocaleString()}원
              </p>
            </div>
          ))}

          <div className="text-right font-bold text-xl mt-4">
            총 결제 금액: {totalPrice.toLocaleString()}원
          </div>
        </div>
      )}

      {/*  3.2 홈으로 돌아가기 버튼 */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

