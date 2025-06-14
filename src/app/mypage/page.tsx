// 과제 1: 마이페이지 구현
"use client";

import { useUser } from "@/context/UserContext";
import Header from "@/component/layout/Header";
import Link from "next/link";

export default function MyPage() {
  // 1.1. UserContext 사용
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      {/* 1.2. Header Component 재사용 */}
      <Header title="마이페이지" />

      {/* 유저 정보 출력 */}
      <div className="mt-8 p-4 w-full max-w-md bg-white shadow rounded space-y-2">
        <p><strong>아이디:</strong> {user.userId}</p>
        <p><strong>나이:</strong> {user.age}</p>
        <p><strong>핸드폰 번호:</strong> {user.phoneNumber}</p>
      </div>

      {/* 1.3. 홈으로 가기 버튼 */}
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        홈으로 가기
      </Link>
    </div>
  );
}
