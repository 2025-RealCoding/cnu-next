"use client";
// CheckoutPage
import { useState } from "react";
import { ProductItem } from "@/types/Product";

interface CheckoutItem {
  product: ProductItem;
  quantity: number;
}
//  과제 3
export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  // 3.1. 결제하기 구현
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">✅ 결제가 완료되었습니다!</h1>
      {/* 3.1. 결제하기 구현 */}
      <div></div>
      {/* 3.2. 홈으로 가기 버튼 구현 */}
    </div>
  );
}
