"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface User {
  name: string;
  userId: string;
  age: number;
  phoneNumber: string;
}

interface UserContextType {
  user: User;
  setUser: (u: User) => void;
}

// context 생성
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// Provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    name: "",
    userId: "",
    age: 0,
    phoneNumber: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook
export const useUser = () => {
  const ctx = useContext(UserContext);
  // 예외 처리
  if (!ctx) throw new Error("UserContext provider가 없습니다.");
  return ctx;
};