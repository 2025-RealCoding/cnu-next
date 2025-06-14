import { UserProvider } from "../../context/UserContext";

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}
