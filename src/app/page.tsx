"use client"; // useRouter 훅을 사용하기 위해 클라이언트 컴포넌트로 선언

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-6 items-center">
      <p className="text-5xl font-bold text-gray-800 p-10">축! 실전코딩 종강</p>

      {/* Link 컴포넌트 대신 onClick 이벤트 핸들러를 사용합니다. */}
      <button
        onClick={() => router.push("/search")}
        className="w-40 px-4 py-2 rounded-md bg-pink-400 text-white border border-gray-300 hover:bg-pink-500 hover:shadow-lg transition cursor-pointer"
      >
        쇼핑하기
      </button>

      <button
        onClick={() => router.push("/mypage")}
        className="w-40 px-4 py-2 rounded-md bg-sky-400 text-white border border-gray-300 hover:bg-sky-500 hover:shadow-lg transition cursor-pointer"
      >
        마이페이지
      </button>
    </div>
  );
}
