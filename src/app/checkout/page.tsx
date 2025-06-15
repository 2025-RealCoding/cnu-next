"use client";
// CheckoutPage
import { useEffect, useState } from "react";
import { ProductItem } from "@/types/Product";
import { useRouter } from "next/navigation";

interface CheckoutItem {
  product: ProductItem;
  quantity: number;
}
//  과제 3
export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("checkoutItems");
    if (data) {
      const parsedData: CheckoutItem[] = JSON.parse(data);
      setItems(parsedData);
      localStorage.removeItem("checkoutItems");
    }
  }, []);

  const total = items.reduce(
    (sum, item) => sum + Number(item.product.lprice) * item.quantity,
    0
  );
  // 3.1. 결제하기 구현
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">✅ 결제가 완료되었습니다!</h1>
      {/* 3.1. 결제하기 구현 */}
      {items.length === 0 ? (
        <p>결제할 아이템이 없습니다</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <li key={index}>
                <div>
                  <p dangerouslySetInnerHTML={{ __html: item.product.title }} />
                  <p>수량 : {item.quantity}</p>
                </div>
                <div>
                  {(
                    Number(item.product.lprice) * item.quantity
                  ).toLocaleString()}{" "}
                  원
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right mt-4 text-lg font-bold">
            총 {total.toLocaleString()}원
          </div>
        </>
      )}
      <div></div>
      {/* 3.2. 홈으로 가기 버튼 구현 */}
      <button onClick={() => router.push("/")}>홈으로 가기</button>
    </div>
  );
}
