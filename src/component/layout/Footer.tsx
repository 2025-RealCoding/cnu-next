import { useUser } from "@/context/UserContext";

/* 실습 4 useContext */
const Footer = () => {
  const { user } = useUser();

  return (
    <div className="relative w-full py-6">
      {/* 가운데 정렬된 copyright 텍스트 */}
      <p className="text-center text-sm">
        © Copyright 2025. {user.name}. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;