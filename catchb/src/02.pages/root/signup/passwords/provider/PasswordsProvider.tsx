import { useContext, useMemo, useState } from "react";
import { router } from "expo-router";
import { isAxiosError } from "axios";

import {
  PasswordVerificationContext,
  PasswordVerificationContextType,
} from "./contexts";
import { useSignup } from "@features/signup/common";
import { usePasswordCheck } from "@features/signup/verify-password";

export function PasswordsProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [password2Input, setPassword2Input] = useState<string>("");

  const [passwordError, setPasswordError] = useState<string>("");

  const isButtonActive = !!passwordInput && !!password2Input;

  const { setPasswords } = useSignup();
  const { mutate: checkPassword } = usePasswordCheck();

  const goToNextPage = () => {
    setPasswordError("");

    checkPassword(
      {
        password: passwordInput,
        password2: password2Input,
      },
      {
        onSuccess: () => {
          setPasswords(passwordInput, password2Input);
          router.push("/signup/phone");
        },
        onError: (error) => {
          if (isAxiosError(error) && error.response?.data?.error) {
            const errorMessage = error.response.data.error;
            setPasswordError(errorMessage);
          } else {
            setPasswordError("오류가 발생했습니다. 다시 시도해주세요.");
          }
        },
      }
    );
  };

  const value = useMemo<PasswordVerificationContextType>(
    () => ({
      password: passwordInput,
      password2: password2Input,
      passwordError,
      setPassword: setPasswordInput,
      setPassword2: setPassword2Input,
      goToNextPage,
      isButtonActive,
    }),
    [passwordInput, password2Input, passwordError]
  );

  return (
    <PasswordVerificationContext.Provider value={value}>
      {children}
    </PasswordVerificationContext.Provider>
  );
}

export function usePasswordVerification() {
  const context = useContext(PasswordVerificationContext);
  if (!context) {
    throw new Error(
      "usePasswordVerification must be used within a PasswordVerificationProvider"
    );
  }
  return context;
}
