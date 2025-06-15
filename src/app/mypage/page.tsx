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
             <div className="max-w-3xl w-full p-6 bg-white rounded shadow mt-6">
        <h1 className="text-2xl font-bold mb-4">마이페이지</h1>
        <div className="space-y-4">
          <div>
            <strong>이름:</strong> {user.name}
          </div>
          <div>
            <strong>아이디:</strong> {user.userId}
          </div>
          <div>
            <strong>나이:</strong> {user.age}세
          </div>
          <div>
            <strong>핸드폰번호:</strong> {user.phoneNumber}
          </div>
          <div>
            <strong>이메일:</strong> {user.email}
          </div>
        </div>
      </div>
      {/* Mypage 정보를 UserContext 활용하여 표시 (이름, 아이디, 나이, 핸드폰번호 모두 포함) */}

      {/* 1.3. 홈으로 가기 버튼 구현(Link or Router 활용) */}
      <Link href="/" className="mt-6 w-full max-w-xs bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
        홈으로 가기
      </Link>
    </div>
  );
}