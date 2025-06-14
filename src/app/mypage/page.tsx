"use client";

import Header from "@/components/Header";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

export default function MyPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-8 space-y-4">
      {/* 1.2 Header 컴포넌트 재사용 */}
      <Header title="마이페이지" />

      {/* 1.1 UserContext 값 출력 */}
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
        <p className="text-lg font-semibold mb-2">이름: {user.userId}</p>
        <p className="text-lg font-semibold mb-2">나이: {user.age}</p>
        <p className="text-lg font-semibold mb-2">핸드폰번호: {user.phoneNumber}</p>
      </div>

      {/* 1.3 홈으로 가기 버튼 */}
      <Link
        href="/"
        className="mt-4 text-blue-600 hover:underline text-sm"
      >
        홈으로 가기
      </Link>
    </div>
  );
}
