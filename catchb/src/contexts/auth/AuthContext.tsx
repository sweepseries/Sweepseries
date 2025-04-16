import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

import { getSecure, removeSecure, saveSecure } from "@services/storage";

// 인증과 관련된 모든 로직을 담당하는 Context.
// 기능 1: 자동 로그인: 앱을 실행할 때, 로컬 스토리지에 저장된 refresh token을 사용하여 자동으로 로그인.
// 기능 2: 자동 로그인 실패 시, 로그인 화면으로 이동.
// 기능 3: Access token 만료 시, refresh token을 사용하여 자동으로 access token을 갱신.

type SocialLoginResult = "SUCCESS" | "FAILURE" | "REDIRECT";

interface AuthContextType {
  login: (username: string, password: string) => Promise<boolean>;
  socialLogin: (id: number | string) => Promise<SocialLoginResult>;
  logout: () => Promise<boolean>;
  mode: "pro" | "normal" | "guest";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"pro" | "normal" | "guest">("guest");

  const login = async (username: string, password: string) => {
    // 로그인 API 호출
    // 로그인에 성공하면, axios의 Authorization 헤더에 access token을 저장하고,
    // 로컬 스토리지에 refresh token을 저장
    try {
      const response = await axios.post(
        "/v1/login/",
        {
          username,
          password,
        },
        {
          headers: {
            "X-Sweep-Platform": "sweep/mobile",
          },
        }
      );

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;

      await saveSecure("refreshToken", response.data.refresh);

      return true;
    } catch {
      return false;
    }
  };

  const socialLogin = async (id: number | string) => {
    try {
      const response = await axios.post(
        "/v1/login/social/",
        {
          username: id,
        },
        {
          headers: {
            "X-Sweep-Platform": "sweep/mobile",
          },
        }
      );

      if (response.data.result === "not_registered") {
        return "REDIRECT";
      }

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;
      await saveSecure("refreshToken", response.data.refresh);

      return "SUCCESS";
    } catch {
      return "FAILURE";
    }
  };

  const logout = async () => {
    // 로그아웃을 위한 API 호출 (refresh token을 사용하여 로그아웃)
    // 로그아웃에 성공하면, 로컬 스토리지에서 refresh token을 삭제하고, axios의 Authorization 헤더를 삭제
    // 또한, 로컬 스토리지에 저장된 앱 관련 모든 데이터 삭제
    try {
      const refreshToken = await getSecure("refreshToken");

      await axios.post("/v1/logout/", {
        refresh: refreshToken,
      }); // 로그아웃 API 호출해서 서버에 토큰 삭제

      delete axios.defaults.headers.common["Authorization"]; // axios의 Authorization 헤더 삭제
      await removeSecure("refreshToken"); // 로컬 스토리지에서 refresh token 삭제

      setMode("guest");

      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const requestTokenRefresh = async () => {
      // 로컬 스토리지에서 refresh token을 가져와서, 서버에 refresh token을 사용하여 access token을 요청
      // 서버에서 access token을 받으면, axios의 Authorization 헤더에 access token을 저장하고,
      // 로컬 스토리지에 refresh token을 저장

      try {
        const refreshToken = await getSecure("refreshToken");
        const response = await axios.post(
          "/v1/tokens/refresh/",
          {
            refresh: refreshToken,
          },
          {
            headers: {
              "X-Sweep-Platform": "sweep/mobile",
            },
          }
        );

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access}`;
        await saveSecure("refreshToken", response.data.refresh);

        return response.data;
      } catch {
        delete axios.defaults.headers.common["Authorization"]; // axios의 Authorization 헤더 삭제
        await removeSecure("refreshToken"); // 로컬 스토리지에서 refresh token 삭제

        setMode("guest");

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

          const response = await requestTokenRefresh();
          if (response) {
            const newAccessToken = response.access;

            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          } else {
            logout();
          }
        }
        return Promise.reject(error);
      }
    );

    // AuthProvider가 mount될 때, 로컬 스토리지에 저장된 refresh token을 사용하여 자동으로 로그인
    requestTokenRefresh();

    // Remove the interceptor when AuthProvider unmounts
    return () => {
      axios.interceptors.response.eject(autoTokenRenewalInterceptor);
    };
  }, []);

  const value = useMemo(() => ({ mode, login, socialLogin, logout }), [mode]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
