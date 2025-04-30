import { createContext } from "react";

export type CatchBAppModeType = "PRO" | "NORMAL" | "GUEST";

export type UserProfileType = {
  uuid: string;
  name: string;
  profileImage: string;
};

type LoginUserDataType = {
  mode: Omit<CatchBAppModeType, "guest">;
} & UserProfileType;

export type LoginData = {
  user: LoginUserDataType;
  access: string;
  refresh: string;
};

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
