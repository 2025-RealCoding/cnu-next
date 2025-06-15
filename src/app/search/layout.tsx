import { SearchProvider } from "../../context/SearchContext";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SearchProvider>{children}</SearchProvider>
  );
}
