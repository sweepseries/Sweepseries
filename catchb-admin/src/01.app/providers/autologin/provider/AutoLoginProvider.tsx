import { useEffect } from "react";
import axios from "axios";

import { refresh } from "../api/refresh";
import { useAuth } from "@shared/lib/auth";

export function AutoLoginProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { login, logout } = useAuth();

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
          error.response.status === 401 &&
          error.response.data.error === "Access Token이 만료되었습니다." &&
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
  }, [login, logout]);

  return children;
}
