/*  실습 1 */
/* 실습 4 useContext */
import { useUser } from "@/context/UserContext";

interface HeaderProps {
  title: string;
}

// 1. props 실습
const Header = ({ title }: HeaderProps) => {
  //  user 정보를 context API를 이용해 가져오기
  const { user, setUser } = useUser();

  return (
    <div className="w-full max-w-md mx-auto flex justify-between items-center px-6 py-4 bg-white shadow-sm rounded-md">
      <h1 className="text-lg font-semibold">{title}</h1>

      <div className="flex items-center gap-2">
        <img
          src="/profile.svg"
          alt="profile"
          className="w-6 h-6 rounded-full bg-gray-300"
        />
        <span className="text-sm font-medium text-gray-800">{user.name}</span>
      </div>
    </div>
  );
};

export default Header;
