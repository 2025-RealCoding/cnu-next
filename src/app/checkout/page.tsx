"use client";
import { useEffect, useState } from "react";
import { ProductItem } from "@/types/Product";
import Link from "next/link";

interface CheckoutItem {
  productId: string;
  title: string;
  lprice: string;
  quantity: number;
}
//  과제 3
export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);

  // 3.1. 결제하기 구현
  useEffect(() => {
    const checkoutItems = localStorage.getItem('checkoutItems');
    if (checkoutItems) {
      setItems(JSON.parse(checkoutItems));
      // 결제 완료 후 localStorage에서 아이템 삭제
      localStorage.removeItem('checkoutItems');
    }
  }, []);

  const total = items.reduce(
    (sum, item) => sum + Number(item.lprice) * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">✅ 결제가 완료되었습니다!</h1>
      
      {items.length === 0 ? (
        <p className="text-gray-500">결제된 아이템이 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="border-b pb-4">
              <p className="font-semibold" dangerouslySetInnerHTML={{ __html: item.title }}></p>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <p>수량: {item.quantity}개</p>
                <p>가격: {(Number(item.lprice) * item.quantity).toLocaleString()}원</p>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-lg mt-4">
            총 결제금액: {total.toLocaleString()}원
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
