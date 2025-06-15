"use client";

import { useUser } from "@/context/UserContext";
import Header from "@/component/layout/Header";
import Link from "next/link";

// 과제 1: 마이페이지 구현
export default function MyPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <Header title="마이페이지" />
      
      <div className="w-full max-w-md p-6 mt-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">회원 정보</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600">이름 : {user.name}</p>
          </div>
          <div>
            <p className="text-gray-600">아이디 :{user.userId}</p>
          </div>
          <div>
            <p className="text-gray-600">나이 :{user.age}</p>
          </div>
          <div>
            <p className="text-gray-600">전화번호 :{user.phoneNumber} </p>
          </div>
        </div>
      </div>

      <Link 
        href="/"
        className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        홈으로 가기
      </Link>
    </div>
  );
}
