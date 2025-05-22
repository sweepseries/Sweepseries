import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { login as loginRequest } from "../api/login";
import { type LoginFormContextType, LoginFormContext } from "../models/context";
import { useAuth } from "@shared/lib/auth";

export function LoginFormProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  const onLogin = useCallback(
    async (username: string, password: string) => {
      setLoading(true);
      const response = await loginRequest(username, password);

      if (response) {
        login(response.access);
        navigate("/home");
      } else {
        window.alert("로그인에 실패했습니다.");
      }

      setLoading(false);
    },
    [login, navigate]
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const value = useMemo<LoginFormContextType>(
    () => ({
      isLoading: loading,
      onLogin: (username: string, password: string) =>
        onLogin(username, password),
    }),
    [loading, onLogin]
  );

  return (
    <LoginFormContext.Provider value={value}>
      {children}
    </LoginFormContext.Provider>
  );
}
