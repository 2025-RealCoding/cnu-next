// 과제 1: 마이페이지 구현
"use client";

import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import Header from "../../component/layout/Header";
import Link from "next/link";

export default function MyPage() {
  // 1.1. UserContext를 활용한 Mypage 구현 (UserContext에 아이디(userId: string), 나이(age: number), 핸드폰번호(phoneNumber: string) 추가)
  const { user, setUser } = useUser();

  useEffect(() => {
    setUser({
      name: "202102705 정제원",
      age: 23,
      phoneNumber: "010-7756-8578" });
  }, []);

  return (
    // <div className="flex justify-center">
    //   <div className="w-[80%]">
    //     <Header title={`${user.name} 쇼핑`} />
    //     <SearchInput />
    //     <ProductCart items={result} />
    //   </div>
    // </div>
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      {/* 1.2. Header Component를 재활용하여 Mypage Header 표기 (title: 마이페이지) */}
      <div className="w-[80%]">
        <Header title="마이페이지" />
      </div>
      {/* Mypage 정보를 UserContext 활용하여 표시 (이름, 아이디, 나이, 핸드폰번호 모두 포함) */}
      <div className="bg-white rounded shadow p-6 mt-8 w-full max-w-md">
        <div className="mb-5 text-4x1 font-bold">회원 정보</div>
        <div className="mb-2">이름: {user.name}</div>
        <div className="mb-2">나이: {user.age}</div>
        <div className="mb-2">핸드폰번호: {user.phoneNumber}</div>
      </div>
      {/* 1.3. 홈으로 가기 버튼 구현(Link or Router 활용) */}
      <Link href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        홈으로 가기
      </Link>
    </div>
  );
}
