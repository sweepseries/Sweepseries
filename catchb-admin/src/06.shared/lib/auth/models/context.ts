import { createContext } from "react";

interface AuthContextType {
  login: (accessToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
