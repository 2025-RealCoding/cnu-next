"use client";
import { createContext, ReactNode, useContext, useState } from "react";

// 과제 1.1 UserContext 구현

// User
interface User {
  name: string;
  // age: number
  // 추가하고 싶은 속성들 ...
  age: number;
  phoneNumber: string;
  userId: string;
}
// UserContextType
interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

//  1. createContext
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// 2. Provider 생성
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    name: "박상우",
    age: 1,
    phoneNumber: "010-2332-1651",
    userId: "202002496박상우",
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. user 정보를 사용하기 위한 custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  // 에러처리
  if (!context) {
    throw new Error("error");
  }
  return context;
};
