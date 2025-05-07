import { useContext, useMemo, useState } from "react";
import axios from "axios";

import { AuthContext } from "../models/context";
import { CatchBAppModeType, LoginData, UserProfileType } from "../models/types";
import { removeSecure, saveSecure } from "@shared/lib/storage";

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Readonly<Props>) {
  const [user, setUser] = useState<UserProfileType | null>(null);
  const [mode, setMode] = useState<CatchBAppModeType>("GUEST");

  const saveLoginStatus = (data: LoginData) => {
    setUser(data.user);
    setMode(data.user.mode);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
    saveSecure("refreshToken", data.refresh);
  };

  const resetLoginStatus = () => {
    setUser(null);
    setMode("GUEST");
    delete axios.defaults.headers.common["Authorization"];
    removeSecure("refreshToken");
  };

  const value = useMemo(
    () => ({
      saveLoginStatus,
      resetLoginStatus,
      user,
      mode,
      isAuthenticated: Boolean(user),
    }),
    [user, mode]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
