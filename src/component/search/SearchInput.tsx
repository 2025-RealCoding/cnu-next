"use client";
import { useSearch } from "@/context/SearchContext";
import { useRef, useEffect } from "react";

export default function SearchInput() {
  const { query, setQuery, setResult } = useSearch();

  // 과제 2.2: input 요소에 대한 ref를 생성합니다.
  const inputRef = useRef<HTMLInputElement>(null);

  // 검색 기능
  const search = async () => {
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`${res.status} 에러 발생`);

      const data = await res.json();
      setResult(data.items || []);
    } catch (error) {
      alert(String(error));
      setResult([]);
    }
  };

  // 과제 2.2: 페이지 최초 렌더링 시, input에 포커스 되는 기능 (useRef)
  useEffect(() => {
    // inputRef.current가 존재할 경우 focus() 메소드를 호출합니다.
    inputRef.current?.focus();
  }, []); // 의존성 배열을 비워 컴포넌트가 처음 마운트될 때 한 번만 실행되도록 합니다.

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <input
        ref={inputRef} // ref를 input 요소에 연결합니다.
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
