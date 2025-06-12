// CheckoutPage
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductItem } from "@/types/Product";

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
      try {
        const raw = JSON.parse(data);

        const converted: CheckoutItem[] = Array.isArray(raw)
          ? raw.map((item: any) => ({
              product: {
                title: item.title ?? "",
                link: "",
                image: "",
                lprice: String(item.price ?? "0"),
                hprice: "",
                mallName: "",
                productId: item.productId ?? "",
                productType: "",
                brand: "",
                maker: "",
                category1: "",
                category2: "",
                category3: "",
                category4: "",
              },
              quantity: item.quantity ?? 1,
            }))
          : [];

        setItems(converted);
      } catch (e) {
        console.error("JSON 파싱 오류:", e);
      } finally {
        localStorage.removeItem("checkoutItems");
      }
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
        <p className="text-gray-500">결제된 아이템이 없습니다.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {items.map(({ product, quantity }) => (
              <li key={product.productId} className="py-2 flex justify-between">
                <div>
                  <p dangerouslySetInnerHTML={{ __html: product.title }} />
                  <p className="text-sm text-gray-500">수량: {quantity}</p>
                </div>
                <div className="font-bold text-right">
                  {(Number(product.lprice) * quantity).toLocaleString()}원
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right mt-4 text-lg font-bold">
            총 합계: {total.toLocaleString()}원
          </div>
        </>
      )}
      <div></div>
      {/* 3.2. 홈으로 가기 버튼 구현 */}
      <button
        onClick={() => router.push("/")}
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        홈으로 가기
      </button>
    </div>
  );
}
