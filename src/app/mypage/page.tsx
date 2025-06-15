"use client";

import { useUser } from "@/context/UserContext";
import Link from "next/link";
import Header from "@/components/Header"; // 이미 있는 컴포넌트일 경우

export default function MyPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-8 space-y-4">
      {/* Header 재사용 */}
      <Header title="마이페이지" />

      {/* 유저 정보 출력 */}
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md text-left">
        <p className="mb-2"><strong>아이디:</strong> {user.userId}</p>
        <p className="mb-2"><strong>나이:</strong> {user.age}</p>
        <p className="mb-2"><strong>전화번호:</strong> {user.phoneNumber}</p>
      </div>

      {/* 홈으로 가기 버튼 */}
      <Link href="/" className="text-blue-600 hover:underline mt-4">
        홈으로 가기
      </Link>
    </div>
  );
}
