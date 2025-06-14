"use client";
import { useUser } from "@/context/UserContext";
import Header from "@/component/layout/Header";
import Link from "next/link";

// 과제 1: 마이페이지 구현
export default function Mypage() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="마이페이지" />
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">내 정보</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">아이디</label>
              <p className="mt-1 text-lg">{user.userId}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">이름</label>
              <p className="mt-1 text-lg">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">나이</label>
              <p className="mt-1 text-lg">{user.age}세</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">핸드폰 번호</label>
              <p className="mt-1 text-lg">{user.phoneNumber}</p>
            </div>
          </div>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              홈으로 가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
