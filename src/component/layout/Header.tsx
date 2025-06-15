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
    <div className="header flex justify-between items-center px-4 py-2">
      <h1 className="text-xl font-bold">{title}</h1>

      <div className="flex items-center gap-2">
        {/* public directory에 profile.svg 파일 넣은 후, image tag에 경로 지정 */}
        <img
          src="/profile.svg"
          alt={user.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm">{user.name}</span>
      </div>
    </div>
  );
};

export default Header;
