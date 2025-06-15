import { SearchProvider } from "../../context/SearchContext";
import { UserProvider } from "../../context/UserContext";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <SearchProvider>{children}</SearchProvider>
    </UserProvider>
  );
}
