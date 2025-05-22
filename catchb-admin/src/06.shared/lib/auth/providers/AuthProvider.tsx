import { useMemo, useState } from "react";
import axios from "axios";

import { AuthContext } from "@shared/lib/auth";

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = (accessToken: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    setIsAuthenticated(true);
  };

  const logout = () => {
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ login, logout, isAuthenticated }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
