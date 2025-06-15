"use client";
import Header from "@/component/layout/Header";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

// 과제 1: 마이페이지 구현
export default function MyPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="마이페이지" />
      
      <div className="flex-1 p-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">내 정보</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">이름</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-gray-600">아이디</p>
              <p className="font-medium">{user.userId}</p>
            </div>
            <div>
              <p className="text-gray-600">나이</p>
              <p className="font-medium">{user.age}세</p>
            </div>
            <div>
              <p className="text-gray-600">핸드폰 번호</p>
              <p className="font-medium">{user.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <Link 
          href="/"
          className="block w-full max-w-md mx-auto bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
