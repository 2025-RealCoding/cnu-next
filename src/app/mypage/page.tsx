"use client";

// 과제 1: 마이페이지 구현
import { useUser } from "@/context/UserContext";
import Header from "@/component/layout/Header";
import Link from "next/link";

export default function MyPage() {
  const { user } = useUser();
  // 1.1. UserContext를 활용한 Mypage 구현 (UserContext에 아이디(userId: string), 나이(age: number), 핸드폰번호(phoneNumber: string) 추가)

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      {/* 1.2. Header Component를 재활용하여 Mypage Header 표기 (title: 마이페이지) */}
      <Header title="마이페이지 " />
      <p>이름: {user.name}</p>
      <p>아이디: {user.userId}</p>
      <p>나이: {user.age}</p>
      <p>핸드폰번호: {user.phoneNumber}</p>
      {/* Mypage 정보를 UserContext 활용하여 표시 (이름, 아이디, 나이, 핸드폰번호 모두 포함) */}

      {/* 1.3. 홈으로 가기 버튼 구현(Link or Router 활용) */}
      <Link
        href="/"
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        홈으로 가기
      </Link>
    </div>
  );
}
