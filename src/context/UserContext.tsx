"use client";

import { createContext, ReactNode, useContext, useState } from "react";

//  과제 1.1 UserContext 구현

//  User 타입 정의
interface User {
  userId: string;
  age: number;
  phoneNumber: string;
}

//  Context의 타입 정의
interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

//  createContext
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

//  Provider 생성
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    userId: "seo",
    age: 25,
    phoneNumber: "010 - 1111 - 2222",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

//  Custom Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser는 UserProvider 안에서만 사용되어야 합니다.");
  }
  return context;
};

