"use client";
import { createContext, ReactNode, useContext, useState } from "react";

// User 타입 정의
interface User {
  name: string;
  userId: string;
  age: number;
  phoneNumber: string;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    name: "정재현",
    userId: "mhgrid",
    age: 26,
    phoneNumber: "010-1234-5678",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext 내부에서만 사용해야 합니다.");
  }
  return context;
};
