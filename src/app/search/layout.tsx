import { SearchProvider } from "@/context/SearchContext";
// UserProvider는 RootLayout에서 제공되므로 여기서는 제거합니다.

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SearchProvider>{children}</SearchProvider>;
}
