"use client";
// query(쿼리), result(검색결과)

import { createContext, ReactNode, useContext, useState } from "react";
import { ProductItem } from "../types/Product";

//  1. SearchContextType
interface SearchContextType {
  query: string;
  setQuery: (q: string) => void;
  result: ProductItem[]; //  타입 지정 예정
  setResult: (r: ProductItem[]) => void;
}

/*  과제 수행 시, 초기 파일은 git에 공유 예정 */

// 2. createContext
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// 3. SearchProvider
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ProductItem[]>([]);
  return (
    <SearchContext.Provider value={{ query, setQuery, result, setResult }}>
      {children}
    </SearchContext.Provider>
  );
};

//  4. useSearch custom Hook
export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch Error");
  }

  return context;
};