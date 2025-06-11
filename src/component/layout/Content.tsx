/* 실습 4 useContext */
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

const Content = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);
  return (
    <div
      className="content"
      style={{
        backgroundColor: isDark ? "black" : "white",
        color: isDark ? "white" : "black",
      }}
    >
      <p>콘텐츠 입니다</p>
    </div>
  );
};

export default Content;

