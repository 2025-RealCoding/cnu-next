// src/app/search/layout.tsx
import { ReactNode } from "react";
import { SearchProvider } from "@/context/SearchContext";

export default function SearchLayout({ children }: { children: ReactNode }) {
  return <SearchProvider>{children}</SearchProvider>;
}
