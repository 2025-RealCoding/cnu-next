"use client";
// CheckoutPage
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CheckoutItem {
  productId: string;
  title: string;
  lprice: string;
  quantity: number;
}
//  과제 3
export default function CheckoutPage() {
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("checkoutItems");
    if (stored) {
      const parsed: CheckoutItem[] = JSON.parse(stored);
      setCheckoutItems(parsed);

      // 결제 완료 후 localStorage에서 삭제
      localStorage.removeItem("checkoutItems");
    }
  }, []);

  const total = checkoutItems.reduce(
    (sum, item) => sum + Number(item.lprice) * item.quantity,
    0
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">✅ 결제 완료</h1>

      {checkoutItems.length === 0 ? (
        <p className="text-center text-gray-500">
          결제된 아이템이 없습니다.
        </p>
      ) : (
        <>
          <ul className="space-y-4">
            {checkoutItems.map((item) => (
              <li key={item.productId} className="flex justify-between">
                <div>
                  <p dangerouslySetInnerHTML={{ __html: item.title }} />
                  <p className="text-sm text-gray-500">
                    수량: {item.quantity}
                  </p>
                </div>
                <p className="text-red-500 font-bold">
                  {(Number(item.lprice) * item.quantity).toLocaleString()}원
                </p>
              </li>
            ))}
          </ul>

          <div className="text-right font-bold text-lg mt-6">
            총 결제 금액: {total.toLocaleString()}원
          </div>
        </>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
