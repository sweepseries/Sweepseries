import { createContext } from "react";

import { CatchBAppModeType, LoginData, UserProfileType } from "./types";

interface AuthContextType {
  saveLoginStatus: (data: LoginData) => void;
  resetLoginStatus: () => void;
  user: UserProfileType | null;
  mode: CatchBAppModeType;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
