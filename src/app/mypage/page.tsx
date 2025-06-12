use client";
import Link from "next/link";
import Header from "@/component/layout/Header";
import { useUser } from "@/context/UserContext";

// 과제 1: 마이페이지 구현
export default function MyPage() {
  // 1.1. UserContext를 활용한 Mypage 구현 (UserContext에 아이디(userId: string), 나이(age: number), 핸드폰번호(phoneNumber: string) 추가)
  const { user } = useUser();
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      {/* 1.2. Header Component를 재활용하여 Mypage Header 표기 (title: 마이페이지) */}
      <Header title="마이페이지" />
      {/* Mypage 정보를 UserContext 활용하여 표시 (이름, 아이디, 나이, 핸드폰번호 모두 포함) */}
      <div className="space-y-4 text-gray-700">
          <p>
            <strong className="font-semibold">이름:</strong> {user.name}
          </p>
          <p>
            <strong className="font-semibold">아이디:</strong> {user.userId}
          </p>
          <p>
            <strong className="font-semibold">나이:</strong> {user.age}
          </p>
          <p>
            <strong className="font-semibold">핸드폰번호:</strong> {user.phoneNumber}
          </p>
        </div>
      {/* 1.3. 홈으로 가기 버튼 구현(Link or Router 활용) */}
      <div className="mt-8 text-center">
          <Link href="/">
            <button className="px-6 py-2 rounded-md bg-sky-500 text-white hover:bg-sky-600 transition">
              홈으로 가기
            </button>
          </Link>
        </div>
    </div>
  );
}
