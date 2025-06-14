"use client";

import { useEffect, useRef } from "react";
import { useSearch } from "@/context/SearchContext";

export default function SearchInput() {
  const { query, setQuery, setResult } = useSearch();

  //  input에 포커스를 위한 ref
  const inputRef = useRef<HTMLInputElement>(null);

  //  최초 렌더링 시 포커스
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  //  검색 실행
  const search = async () => {
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`${res.status} 에러 발생`);
      const data = await res.json();
      console.log(" API 응답:", data);
      setResult(data.items || []);
    } catch (error) {
      alert(error);
      setResult([]);
    }
  };

  //  입력 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요"
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={search}
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
      >
        검색
      </button>
    </div>
  );
}
