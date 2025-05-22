import { createContext } from "react";

export interface LoginFormContextType {
  isLoading: boolean;
  onLogin: (username: string, password: string) => Promise<void>;
}

export const LoginFormContext = createContext<LoginFormContextType | undefined>(
  undefined
);
