import { createContext } from "react";

// 1. 기본 context
//export const ThemeContext = createContext(null);  //  이렇게만 지정하면 Provider에서 사용할 때 type error
export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  setIsDark: () => {},
}); //
// 2. con
