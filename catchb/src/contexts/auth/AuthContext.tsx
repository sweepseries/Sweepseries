import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import axios from "axios";

import { useAlert } from "@contexts/app";
import {
  kakaoLogin as kakaoLoginRequest,
  naverLogin as naverLoginRequest,
  catchBLogin as catchBLoginRequest,
  logout as logoutRequest,
  refresh,
} from "@services/auth";
import { removeSecure, saveSecure } from "@services/storage";

// 인증과 관련된 모든 로직을 담당하는 Context.
// 기능 1: 자동 로그인: 앱을 실행할 때, 로컬 스토리지에 저장된 refresh token을 사용하여 자동으로 로그인.
// 기능 2: 자동 로그인 실패 시, 로그인 화면으로 이동.
// 기능 3: Access token 만료 시, refresh token을 사용하여 자동으로 access token을 갱신.

type LoginData = {
  uuid: string;
  mode: "pro" | "normal" | "guest";
  access: string;
  refresh: string;
};

interface AuthContextType {
  catchBLogin: (username: string, password: string) => Promise<boolean>;
  kakaoLogin: () => Promise<void>;
  naverLogin: () => Promise<void>;
  logout: () => Promise<void>;
  mode: "pro" | "normal" | "guest";
  uuid: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [uuid, setUuid] = useState<string | null>(null);
  const [mode, setMode] = useState<"pro" | "normal" | "guest">("guest");

  const { showAlert } = useAlert();

  const saveLoginStatus = (data: LoginData) => {
    setUuid(data.uuid);
    setMode(data.mode);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
    saveSecure("refreshToken", data.refresh);
  };

  const resetLoginStatus = () => {
    setUuid(null);
    setMode("guest");
    delete axios.defaults.headers.common["Authorization"];
    removeSecure("refreshToken");
  };

  const loginFail = (title: string) => {
    showAlert({
      title,
      message: "로그인에 실패했습니다. 다시 시도해주세요.",
    });
    resetLoginStatus();
  };

  const catchBLogin = async (username: string, password: string) => {
    const result = await catchBLoginRequest(username, password);

    if (!result) {
      loginFail("로그인 실패");
      return false;
    }

    saveLoginStatus(result);

    return true;
  };

  const kakaoLogin = async () => {
    const result = await kakaoLoginRequest();

    if (!result) {
      loginFail("카카오 로그인 실패");
      return;
    }

    if (result.result === "REDIRECT") {
      showAlert({
        title: "회원가입",
        message: "회원가입이 필요합니다. 회원가입 페이지로 이동합니다.",
        onConfirm: () => {
          router.push({
            pathname: "/signup/terms",
            params: {
              mode: "kakao",
              username: result.initialProfile.id,
              email: result.initialProfile.email,
              name: result.initialProfile.name,
              phone: "",
              birthday: result.initialProfile.birthday,
              birthyear: result.initialProfile.birthyear,
              gender: result.initialProfile.gender,
              nickname: result.initialProfile.nickname,
              profileImage: result.initialProfile.profileImageUrl,
            },
          });
        },
      });
    } else {
      // 로그인 성공 시, 홈 화면으로 이동
      saveLoginStatus(result);
      router.dismissAll();
      router.replace("/home");
    }
  };

  const naverLogin = async () => {
    const result = await naverLoginRequest();

    if (!result) {
      loginFail("네이버 로그인 실패");
      return;
    }

    if (result.result === "REDIRECT") {
      showAlert({
        title: "회원가입",
        message: "회원가입이 필요합니다. 회원가입 페이지로 이동합니다.",
        onConfirm: () => {
          router.push({
            pathname: "/signup/terms",
            params: {
              mode: "naver",
              username: result.initialProfile.id,
              email: result.initialProfile.email,
              name: result.initialProfile.name,
              phone: "",
              birthday: result.initialProfile.birthday ?? "",
              birthyear: result.initialProfile.birthyear ?? "",
              gender: result.initialProfile.gender ?? "",
              nickname: result.initialProfile.nickname ?? "",
              profileImage: result.initialProfile.profile_image ?? "",
            },
          });
        },
      });
    } else {
      // 로그인 성공 시, 홈 화면으로 이동
      saveLoginStatus(result);
      router.dismissAll();
      router.replace("/home");
    }
  };

  const logout = async () => {
    // 로그아웃을 위한 API 호출 (refresh token을 사용하여 로그아웃)
    // 로그아웃에 성공하면, 로컬 스토리지에서 refresh token을 삭제하고, axios의 Authorization 헤더를 삭제
    // 또한, 로컬 스토리지에 저장된 앱 관련 모든 데이터 삭제
    const logoutResult = await logoutRequest();

    if (logoutResult) {
      resetLoginStatus();
      router.replace("/login");
    } else {
      showAlert({
        title: "로그아웃 실패",
        message: "로그아웃에 실패했습니다. 다시 시도해주세요.",
      });
    }
  };

  useEffect(() => {
    const refreshToken = async () => {
      const response = await refresh();

      if (response) {
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

          const response = await refreshToken();
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
      const result = await refreshToken();

      if (result) {
        setUuid(result.uuid);
        setMode(result.mode);
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
    () => ({ mode, uuid, catchBLogin, logout, kakaoLogin, naverLogin }),
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
