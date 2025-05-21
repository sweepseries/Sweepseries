import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { refresh } from "../api/refresh";
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

  useEffect(() => {
    const refreshToken = async () => {
      const response = await refresh();

      if (response) {
        login(response.access);

        return response.access;
      } else {
        logout();

        return null;
      }
    };

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status === 403 &&
          error.response.data.code === "token_not_valid" &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          const token = await refreshToken();
          if (token) {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;

            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    refreshToken();

    // Remove the interceptor when AuthProvider unmounts
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const value = useMemo(
    () => ({ login, logout, isAuthenticated }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
