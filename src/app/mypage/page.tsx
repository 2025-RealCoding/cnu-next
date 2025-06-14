"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/component/layout/Header";
import { useUser } from "@/context/UserContext";

// 과제 1: 마이페이지 구현
export default function MyPage() {
  const { user, setUser } = useUser();

  // 페이지가 마운트될 때 UserContext에 사용자 정보를 설정합니다.
  useEffect(() => {
    // 제 정보와 강의자료 예시를 기반으로 사용자 정보를 설정합니다.
    setUser({
      name: "Dongmin Lee",
      userId: "dmin.lee",
      age: 24,
      phoneNumber: "010-1234-5678",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50">
      <div className="w-full max-w-3xl">
        <Header title="마이페이지" />
      </div>

      <div className="w-full max-w-2xl p-8 mt-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          회원 정보
        </h2>
        <div className="space-y-4 text-lg">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">이름:</span>
            <span className="text-gray-900">{user.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">아이디:</span>
            <span className="text-gray-900">{user.userId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">나이:</span>
            <span className="text-gray-900">{user.age}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">전화번호:</span>
            <span className="text-gray-900">{user.phoneNumber}</span>
          </div>
        </div>
      </div>

      {/* 1.3. 홈으로 가기 버튼 구현(Link or Router 활용) */}
      <div className="mt-8">
        <Link href="/">
          <button className="w-48 px-6 py-3 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:shadow-lg transition-transform transform hover:-translate-y-1">
            홈으로 가기
          </button>
        </Link>
      </div>
    </div>
  );
}
