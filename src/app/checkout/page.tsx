"use client";

import { useState, useEffect } from "react";
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
  const [totalAmount, setTotalAmount] = useState(0);

  // 3.1. 결제 완료 페이지 구현
  useEffect(() => {
    // localStorage에서 결제 아이템들 가져오기
    const checkoutData = localStorage.getItem("checkoutItems");
    
    if (checkoutData) {
      const parsedItems: CheckoutItem[] = JSON.parse(checkoutData);
      setItems(parsedItems);
      
      // 총 금액 계산
      const total = parsedItems.reduce((sum, item) => {
        return sum + (Number(item.lprice) * item.quantity);
      }, 0);
      setTotalAmount(total);
      
      // 결제 완료 후 localStorage에서 삭제
      localStorage.removeItem("checkoutItems");
    }
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">결제가 완료되었습니다!</h1>
      
      {/* 3.1. 결제하기 구현 */}
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">결제된 아이템이 없습니다</p>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-4">주문 내역</h2>
          <ul className="space-y-4 mb-6">
            {items.map((item, index) => (
              <li key={index} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium" dangerouslySetInnerHTML={{ __html: item.title }}></p>
                  <p className="text-sm text-gray-500">수량: {item.quantity}개</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-500">
                    {(Number(item.lprice) * item.quantity).toLocaleString()}원
                  </p>
                  <p className="text-xs text-gray-400">
                    개당 {Number(item.lprice).toLocaleString()}원
                  </p>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>총 결제 금액:</span>
              <span className="text-red-500">{totalAmount.toLocaleString()}원</span>
            </div>
          </div>
        </div>
      )}
      
      {/* 3.2. 홈으로 가기 버튼 구현 */}
      <div className="flex justify-center mt-8">
        <Link 
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          홈 화면으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
