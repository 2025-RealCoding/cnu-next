// 과제 1: 마이페이지 구현
"use client";

import Header from "@/component/layout/Header";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

export default function MyPage() {
  // 1.1. UserContext를 활용한 Mypage 구현 (UserContext에 아이디(userId: string), 나이(age: number), 핸드폰번호(phoneNumber: string) 추가)
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      {/* 1.2. Header Component를 재활용하여 Mypage Header 표기 (title: 마이페이지) */}
      <Header title="마이페이지" />
      {/* Mypage 정보를 UserContext 활용하여 표시 (이름, 아이디, 나이, 핸드폰번호 모두 포함) */}
      <div className="mt-10 bg-white p-6 rounded-2xl shadow-xl w-96 space-y-4 text-left border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">👤 사용자 정보</h2>
        <div className="space-y-2 text-gray-700 text-base">
          <p><span className="font-semibold">이름:</span> {user.name}</p>
          <p><span className="font-semibold">아이디:</span> {user.userId}</p>
          <p><span className="font-semibold">나이:</span> {user.age}세</p>
          <p><span className="font-semibold">핸드폰번호:</span> {user.phoneNumber}</p>
        </div>
      </div>

      <Link
        href="/"
        className="mt-8 inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow-md transition duration-300"
      >
        🏠 홈으로 가기
      </Link>


    </div>
  );
}
