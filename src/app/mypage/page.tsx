"use client";
import Header from "@/component/layout/Header";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

export default function MyPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      {/* 1.2 Header 재사용 */}
      <Header title="마이페이지" />

      {/* 회원 정보 카드 */}
      <section className="w-full max-w-md bg-white p-6 mt-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">회원 정보</h2>
        <p>이름: {user.name}</p>
        <p>아이디: {user.userId}</p>
        <p>나이: {user.age}</p>
        <p>전화번호: {user.phoneNumber}</p>
      </section>

      {/* 홈으로 가기 */}
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        홈으로 가기
      </Link>
    </div>
  );
}