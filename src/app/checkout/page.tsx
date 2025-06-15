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
    // localStorage에서 결제된 아이템 가져오기
    const checkoutItems = localStorage.getItem('checkoutItems');
    if (checkoutItems) {
      setItems(JSON.parse(checkoutItems));
      // 결제 완료 후 localStorage에서 데이터 삭제
      localStorage.removeItem('checkoutItems');
    }
  }, []);

  // 총 금액 계산
  const total = items.reduce(
    (sum, item) => sum + Number(item.lprice) * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">✅ 결제가 완료되었습니다!</h1>
      
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">결제된 아이템이 없습니다</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="border-b pb-4">
              <h3 className="font-medium" dangerouslySetInnerHTML={{ __html: item.title }}></h3>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>수량: {item.quantity}개</span>
                <span>가격: {Number(item.lprice).toLocaleString()}원</span>
              </div>
              <div className="text-right text-red-500 font-medium mt-1">
                소계: {(Number(item.lprice) * item.quantity).toLocaleString()}원
              </div>
            </div>
          ))}
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="font-bold">총 결제 금액</span>
              <span className="text-xl font-bold text-red-500">
                {total.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <Link 
          href="/"
          className="block w-full text-center bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
