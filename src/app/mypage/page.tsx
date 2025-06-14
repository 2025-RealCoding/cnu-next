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
      <div className="mt-8 bg-white p-6 rounded shadow w-full max-w-md">
        <ul className="space-y-2">
          <li>
            <strong>이름:</strong> {user.name}
          </li>
          <li>
            <strong>아이디:</strong> {user.userId}
          </li>
          <li>
            <strong>나이:</strong> {user.age}
          </li>
          <li>
            <strong>핸드폰번호:</strong> {user.phoneNumber}
          </li>
        </ul>
      </div>

      {/* 1.3. 홈으로 가기 버튼 구현(Link or Router 활용) */}
      <Link href="/" className="mt-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          홈으로 가기
        </button>
      </Link>
    </div>
  );
}
