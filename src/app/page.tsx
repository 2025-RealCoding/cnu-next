import Link from "next/link";

// link
export default function Home() {
  return (
    <div className="flex flex-col space-y-6 items-center">
      <p className="text-5xl font-bold text-gray-800 p-10">축! 실전코딩 종강</p>

      <Link href="/search">
        <button className="w-40 px-4 py-2 rounded-md bg-pink-400 text-white border border-gray-300 hover:bg-pink-500 hover:shadow-lg transition cursor-pointer">
          쇼핑하기
        </button>
      </Link>

      <Link href="/mypage">
        <button className="w-40 px-4 py-2 rounded-md bg-sky-400 text-white border border-gray-300 hover:bg-sky-500 hover:shadow-lg transition cursor-pointer">
          마이페이지
        </button>
      </Link>
    </div>
  );
}
