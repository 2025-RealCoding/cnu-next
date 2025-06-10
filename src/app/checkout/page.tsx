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
  
  // 3.1. 결제완료 페이지 구현 (useEffect, localStorage 활용)
  useEffect(() => {
    // localStorage에서 데이터 조회
    const savedItems = localStorage.getItem('checkoutItems');
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        setItems(parsedItems);
        
        // 결제 완료 후 localStorage에서 데이터 삭제
        localStorage.removeItem('checkoutItems');
        
        // 추가: 결제 완료 후 모든 장바구니 아이템도 삭제
        parsedItems.forEach((item: CheckoutItem) => {
          localStorage.removeItem(item.productId);
        });
        
      } catch (error) {
        console.error('Failed to parse checkout items:', error);
        setItems([]);
      }
    }
  }, []);

  // 총 금액 계산
  const totalAmount = items.reduce(
    (sum, item) => sum + Number(item.lprice) * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">✅ 결제가 완료되었습니다!</h1>
      
      {/* 3.1. 결제하기 구현 */}
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">결제된 아이템이 없습니다</p>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">주문 내역</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center p-4 bg-gray-50 rounded">
                <div>
                  <p className="font-medium" dangerouslySetInnerHTML={{ __html: item.title }}></p>
                  <p className="text-sm text-gray-500">수량: {item.quantity}개</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-500">
                    {(Number(item.lprice) * item.quantity).toLocaleString()}원
                  </p>
                  <p className="text-sm text-gray-500">
                    단가: {Number(item.lprice).toLocaleString()}원
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">총 결제 금액:</span>
              <span className="text-2xl font-bold text-blue-600">
                {totalAmount.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* 3.2. 홈으로 가기 버튼 구현 */}
      <div className="mt-8 text-center">
        <Link 
          href="/" 
          className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors inline-block"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
