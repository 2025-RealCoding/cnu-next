"use client";
import { createContext, ReactNode, useContext, useState } from "react";

// ✅ User 인터페이스 수정 (과제 요구사항 반영)
interface User {
  userId: string;
  age: number;
  phoneNumber: string;
}

// ✅ UserContextType 정의
interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

// ✅ createContext
export const UserContext = createContext<UserContextType | undefined>(undefined);

// ✅ Provider 컴포넌트
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
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

// ✅ 커스텀 훅
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
