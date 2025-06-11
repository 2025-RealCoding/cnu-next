"use client";

import Header from "@/component/layout/Header";
import Footer from "@/component/layout/Footer";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useEffect } from "react";

export default function MyPage() {
  // 1.1. UserContext에서 사용자 정보 가져오기
  const { user,setUser } = useUser();

  useEffect(() => {
    setUser({
      userId: "202302554",
      name: "박소윤",
      age: 22,
      phoneNumber: "010-1234-5678",
    });
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      {/* 1.2. Header 재활용 */}
      <Header title="마이페이지" />

      {/* 회원 정보 표시 */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">회원 정보</h2>
        <p>이름: {user.name}</p>
        <p>아이디: {user.userId}</p>
        <p>나이: {user.age}</p>
        <p>전화번호: {user.phoneNumber}</p>
      </div>

      {/* 1.3. 홈으로 가기 버튼 */}
      <Link href="/">
        <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          홈으로 가기
        </button>
      </Link>

      <Footer/>
    </div>
  );
}
