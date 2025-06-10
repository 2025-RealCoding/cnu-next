"use client";

// CheckoutPage
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
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // localStorage에서 결제된 아이템 불러오기
    const data = localStorage.getItem("checkoutCart");
    if (data) {
      const parsed = JSON.parse(data) as (ProductItem & { quantity: number })[];
      setItems(parsed.map(item => ({
        product: item,
        quantity: item.quantity
      })));
      // 총 금액 계산
      const sum = parsed.reduce(
        (acc, item) => acc + Number(item.lprice) * item.quantity,
        0
      );
      setTotal(sum);
      // 결제 완료 후 localStorage에서 삭제
      localStorage.removeItem("checkoutCart");
    }
  }, []);
  // 3.1. 결제하기 구현
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">✅ 결제가 완료되었습니다!</h1>
      {/* 3.1. 결제하기 구현 */}
      <div>
        {items.length === 0 ? (
          <p className="text-gray-500">결제된 아이템이 없습니다</p>
        ) : (
          <div>
            <ul className="mb-4">
              {items.map(({ product, quantity }) => (
                <li key={product.productId} className="mb-2 border-b pb-2 flex justify-between items-center">
                  <div>
                    <div dangerouslySetInnerHTML={{ __html: product.title }} />
                    <div className="text-sm text-gray-600">
                      수량: {quantity}
                    </div>
                  </div>
                  <div className="text-right font-bold text-red-500">
                    {(Number(product.lprice) * quantity).toLocaleString()}원
                  </div>
                </li>
              ))}
            </ul>
            <div className="text-right text-lg font-bold">
              총 결제 금액: {total.toLocaleString()}원
            </div>
          </div>
        )}
      </div>
      {/* 3.2. 홈으로 가기 버튼 구현 */}
      <div className="mt-8 flex justify-end">
        <Link
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
