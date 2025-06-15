"use client";
import { useUser } from "@/context/UserContext";
import Header from "@/component/layout/Header";
import Link from "next/link";
import {useEffect} from "react";

export default function MyPage() {
    const { user, setUser } = useUser();
    useEffect(() => {
        setUser({
            userId: "202003130",
            name: "송수민",
            age: 25,
            phoneNumber: "010-1234-5678",
        });
    }, [setUser]);
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50">
            <Header title="마이페이지" />
            <div className="bg-white rounded-lg shadow-md p-6 mt-8 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">사용자 정보</h2>
                <div className="space-y-3">
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-gray-600 font-medium">이름:</span>
                        <span className="text-gray-800">{user.name || "설정되지 않음"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-gray-600 font-medium">아이디:</span>
                        <span className="text-gray-800">{user.userId || "설정되지 않음"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-gray-600 font-medium">나이:</span>
                        <span className="text-gray-800">{user.age > 0 ? `${user.age}세` : "설정되지 않음"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">핸드폰번호:</span>
                        <span className="text-gray-800">{user.phoneNumber || "설정되지 않음"}</span>
                    </div>
                </div>
            </div>
            <Link href="/">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-6 hover:bg-blue-600 transition duration-200">
                    홈으로 가기
                </button>
            </Link>
        </div>
    );
}