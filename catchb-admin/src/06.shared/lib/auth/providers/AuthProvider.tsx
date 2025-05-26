import { useCallback, useMemo, useState } from "react";
import axios from "axios";

import { AuthContext } from "@shared/lib/auth";

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = useCallback((accessToken: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ login, logout, isAuthenticated }),
    [isAuthenticated, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
