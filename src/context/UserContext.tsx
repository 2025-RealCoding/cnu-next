"use client";
import { createContext, ReactNode, useContext, useState } from "react";

// 과제 1.1 UserContext 구현

// User
interface User {
  name: string;
  userId: string;
  age: number;
  phoneNumber: string;
  // 추가하고 싶은 속성들 ...
}
// UserContextType
interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

// 초기값 설정
const initialUser: User = {
  name: "정윤서",
  userId: "001",
  age: 24,
  phoneNumber: "010-3353-2790",
};

//  1. createContext
export const UserContext = createContext<UserContextType>({
  user: initialUser,
  setUser: () => {},
});

// 2. Provider 생성
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(initialUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. user 정보를 사용하기 위한 custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
