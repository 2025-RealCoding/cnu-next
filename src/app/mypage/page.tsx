// 과제 1: 마이페이지 구현

"use client";

import { useUser } from "@/context/UserContext";
import Header from "@/component/layout/Header";
import Link from "next/link";

export default function MyPage() {
  // 1.1. UserContext를 활용한 Mypage 구현 (UserContext에 아이디(userId: string), 나이(age: number), 핸드폰번호(phoneNumber: string) 추가)
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      {/* 1.2. Header Component를 재활용하여 Mypage Header 표기 (title: 마이페이지) */}
      {/* Mypage 정보를 UserContext 활용하여 표시 (이름, 아이디, 나이, 핸드폰번호 모두 포함) */}
      <p>마이페이지</p>
      <Header title="마이페이지" />
      <div style={{padding: "16px" }}>
        <p>이름: {user.name}</p>
        <p>아이디: {user.userId}</p>
        <p>나이: {user.age}</p>
        <p>핸드폰번호: {user.phoneNumber}</p>

      {/* 1.3. 홈으로 가기 버튼 구현(Link or Router 활용) */}
        <Link href="/">
          <button style={{ padding: "8px 16px", border: "1px solid #ccc" }}>
            홈으로 가기
          </button>
        </Link>
      </div>
    </div>
  );
}
