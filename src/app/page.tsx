"use client";

// import 문을 tsconfig.json의 paths 별칭(@)을 사용하도록 수정했습니다.
import Header from "@/component/layout/Header";
import SearchInput from "@/component/search/SearchInput";
import ProductCart from "@/component/shopping/ProductCart";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { useSearch } from "@/context/SearchContext";

export default function SearchHome() {
  const { user, setUser } = useUser();
  const { result } = useSearch();

  useEffect(() => {
    //  학번 + 이름 형태로 작성 (ex. 2025***** 내이름 )
    setUser({
      name: "202304352 Dongmin Lee",
      userId: "dmin.lee", // 임시 데이터
      age: 22, // 임시 데이터
      phoneNumber: "010-1234-5678", // 임시 데이터
    });
  }, [setUser]);

  return (
    <div className="flex justify-center">
      <div className="w-[80%]">
        <Header title={`${user.name} 쇼핑`} />
        <SearchInput />
        <ProductCart items={result} />
      </div>
    </div>
  );
}
