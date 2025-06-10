
import { UserProvider } from "../../context/UserContext";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}
