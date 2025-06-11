"use client";

import Header from "@/component/layout/Header";
import Footer from "@/component/layout/Footer";
import SearchInput from "@/component/search/SearchInput";
import ProductCart from "@/component/shopping/ProductCart";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { useSearch } from "@/context/SearchContext";

export default function SearchHome() {
  const { user, setUser } = useUser();
  const { result } = useSearch();

  // 페이지 최초 렌더링 시 더미 사용자 정보 주입
  useEffect(() => {
    setUser({
      name: "정지환",
      userId: "jihwanJung",
      age: 23,
      phoneNumber: "010-7732-8633",
    });
  }, [setUser]);

  return (
    <div className="flex justify-center">
      <div className="w-[80%]">
        <Header title={`${user.name || "Guest"}'s 쇼핑`} />
        <SearchInput />
        <ProductCart items={result} />
        {/* Footer가 필요하면 아래에 추가 */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}
