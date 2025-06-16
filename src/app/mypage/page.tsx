"use client";
import Header from "@/component/layout/Header";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

// 과제 1: 마이페이지 구현
export default function MyPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <Header title="마이페이지" />
      
      <div className="w-full max-w-md p-6 mt-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">내 정보</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600">이름</p>
            <p className="font-semibold">{user.name}</p>
          </div>
          <div>
            <p className="text-gray-600">아이디</p>
            <p className="font-semibold">{user.userId}</p>
          </div>
          <div>
            <p className="text-gray-600">나이</p>
            <p className="font-semibold">{user.age}세</p>
          </div>
          <div>
            <p className="text-gray-600">핸드폰 번호</p>
            <p className="font-semibold">{user.phoneNumber}</p>
          </div>
        </div>
      </div>

      <Link 
        href="/"
        className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        홈으로 가기
      </Link>
    </div>
  );
}
