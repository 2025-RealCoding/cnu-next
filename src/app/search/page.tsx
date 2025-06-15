"use client";

import Header from "../../component/layout/Header";
import Footer from "../../component/layout/Footer";
import SearchInput from "../../component/search/SearchInput";
import ProductCart from "../../component/shopping/ProductCart";
import { useUser } from "../../context/UserContext";
import { useSearch } from "../../context/SearchContext";

export default function SearchHome() {
  const { user } = useUser();
  const { result } = useSearch();

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
