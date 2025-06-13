"use client";
import { createContext, ReactNode, useContext, useState } from "react";

// 과제 1.1 UserContext 구현

// User
interface User {
  name: string;
  age: number;
  userId: string;
  email: string;
  phoneNumber: string;
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
    name: "202102717 최성윤",
    age: 22,
    userId: "csy100886",
    email: "csy100886@gmail.com",
    phoneNumber: "010-0000-0000",
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