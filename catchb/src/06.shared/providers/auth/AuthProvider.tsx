import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import axios from "axios";

import { refreshToken } from "./refreshToken";
import { getSecure, removeSecure, saveSecure } from "@shared/lib/storage";
import { useAlert } from "@shared/providers";

type LoginData = {
  user: {
    uuid: string;
    mode: "pro" | "normal" | "guest";
  };
  access: string;
  refresh: string;
};

interface AuthContextType {
  saveLoginStatus: (data: LoginData) => void;
  resetLoginStatus: () => void;
  mode: "pro" | "normal" | "guest";
  uuid: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [uuid, setUuid] = useState<string | null>(null);
  const [mode, setMode] = useState<"pro" | "normal" | "guest">("guest");

  const { showAlert } = useAlert();

  const saveLoginStatus = (data: LoginData) => {
    setUuid(data.user.uuid);
    setMode(data.user.mode);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
    saveSecure("refreshToken", data.refresh);
  };

  const resetLoginStatus = () => {
    setUuid(null);
    setMode("guest");
    delete axios.defaults.headers.common["Authorization"];
    removeSecure("refreshToken");
  };

  useEffect(() => {
    const refreshRequest = async () => {
      const token = await getSecure("refreshToken");

      const response = await refreshToken(token);

      if (response) {
        saveLoginStatus(response);

        return response;
      } else {
        resetLoginStatus();

        return null;
      }
    };

    const autoTokenRenewalInterceptor = axios.interceptors.response.use(
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

          const response = await refreshRequest();
          if (response) {
            const newAccessToken = response.access;

            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          } else {
            resetLoginStatus();
            showAlert({
              title: "로그인 세선 만료",
              message: "세션이 만료되었습니다. 다시 로그인해주세요.",
              onConfirm: () => {
                router.replace("/login");
              },
            });
          }
        }
        return Promise.reject(error);
      }
    );

    // AuthProvider가 mount될 때, 로컬 스토리지에 저장된 refresh token을 사용하여 자동으로 로그인
    const autoLogin = async () => {
      const result = await refreshRequest();

      if (result) {
        if (router.canDismiss()) {
          router.dismissAll();
        }
        router.replace("/home");
      }
    };

    autoLogin();

    // Remove the interceptor when AuthProvider unmounts
    return () => {
      axios.interceptors.response.eject(autoTokenRenewalInterceptor);
    };
  }, []);

  const value = useMemo(
    () => ({
      saveLoginStatus,
      resetLoginStatus,
      mode,
      uuid,
    }),
    [mode, uuid]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
