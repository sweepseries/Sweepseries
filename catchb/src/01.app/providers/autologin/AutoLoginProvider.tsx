import { useEffect } from "react";
import { router } from "expo-router";
import axios from "axios";

import { refreshToken } from "./api";
import { useAlert } from "@shared/lib/alert";
import { useAuth } from "@shared/lib/auth";
import { getSecure } from "@shared/lib/storage";

interface Props {
  children: React.ReactNode;
}

export function AutoLoginProvider({ children }: Readonly<Props>) {
  const { showAlert } = useAlert();
  const { saveLoginStatus, resetLoginStatus } = useAuth();

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

    const autoTokenRenewalInterceptor = axios.interceptors.response.use(
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

    // Remove the interceptor when AuthProvider unmounts
    return () => {
      axios.interceptors.response.eject(autoTokenRenewalInterceptor);
    };
  }, []);

  return children;
}
