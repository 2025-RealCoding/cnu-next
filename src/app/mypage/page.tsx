"use client";
import { useUser } from "@/context/UserContext";
import Header from "@/component/layout/Header";
import Link from "next/link";

// 과제 1: 마이페이지 구현
export default function MyPage() {
  // 1.1. UserContext를 활용한 Mypage 구현 (UserContext에 아이디(userId: string), 나이(age: number), 핸드폰번호(phoneNumber: string) 추가)
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      {/* 1.2. Header Component를 재활용하여 Mypage Header 표기 (title: 마이페이지) */}
      <div className="w-full">
        <Header title="마이페이지" />
      </div>
      
      {/* Mypage 정보를 UserContext 활용하여 표시 (이름, 아이디, 나이, 핸드폰번호 모두 포함) */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">내 정보</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="font-medium text-gray-600">이름:</span>
            <span className="text-gray-800">{user.name}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="font-medium text-gray-600">아이디:</span>
            <span className="text-gray-800">{user.userId}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="font-medium text-gray-600">나이:</span>
            <span className="text-gray-800">{user.age}세</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="font-medium text-gray-600">핸드폰번호:</span>
            <span className="text-gray-800">{user.phoneNumber}</span>
          </div>
        </div>
      </div>

      {/* 1.3. 홈으로 가기 버튼 구현(Link or Router 활용) */}
      <Link 
        href="/" 
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        홈으로 가기
      </Link>
    </div>
  );
}
