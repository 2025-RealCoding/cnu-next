// CheckoutPage
"use client";
import { ProductItem } from "@/types/Product";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CheckoutItem {
  product: ProductItem;
  quantity: number;
}
//  과제 3
export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("checkout");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.length === 0) setIsEmpty(true);
      else setItems(parsed);
    } else {
      setIsEmpty(true);
    }
    localStorage.removeItem("checkout");
  }, []);

  const getTotalPrice = () => {
    return items.reduce(
      (sum: number, item:CheckoutItem) => sum + Number(item.product.lprice) * item.quantity,
      0
    );
  };
  // 3.1. 결제하기 구현
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">✅ 결제가 완료되었습니다!</h1>
      {/* 3.1. 결제하기 구현 */}
      {isEmpty ? (
        <p className="text-gray-500">결제된 아이템이 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item:CheckoutItem, index:number) => (
            <div
              key={index}
              className="flex justify-between border-b pb-2 items-center"
            >
              <div>
                <p className="font-semibold">{item.product.title}</p>
                <p className="text-sm text-gray-500">
                  {item.product.lprice.toLocaleString()}원 × {item.quantity}
                </p>
              </div>
              <div>
                {(Number(item.product.lprice) * item.quantity).toLocaleString()}원
              </div>
            </div>
          ))}
          <div className="font-bold text-right pt-4">
            총 결제금액: {getTotalPrice().toLocaleString()}원
          </div>
        </div>
      )}
      {/* 3.2. 홈으로 가기 버튼 구현 */}
      <div className="mt-6 text-right">
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          홈으로 가기
        </button>
      </div>
    </div>
  );
}
