"use client";
import { createContext, ReactNode, useContext, useState } from "react";
// 과제 1.1 UserContext 구현

// User
interface User {
  userId: string;
  name: string;
  age: number;
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
    userId: "202102636 박상우",
    name: "parksangwoo",
    age: 1,
    phoneNumber: "010-1234-5678",
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
  if (!context) throw new Error("No UserContext");
  return context;
};