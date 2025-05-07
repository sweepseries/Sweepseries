import { useContext, useMemo, useState } from "react";
import { router } from "expo-router";
import { isAxiosError } from "axios";

import { UsernameEmailContext, UsernameEmailContextType } from "./context";
import { useSignup } from "@features/signup/common";
import { useUsernameEmailCheck } from "@features/signup/verify-username-email";

export function UsernameEmailProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");

  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const isButtonActive = !!usernameInput && !!emailInput;

  const { setUsernameEmail } = useSignup();
  const { mutate: checkUsernameEmail } = useUsernameEmailCheck();

  const goToNextPage = () => {
    setUsernameError("");
    setEmailError("");

    checkUsernameEmail(
      {
        username: usernameInput,
        email: emailInput,
      },
      {
        onSuccess: () => {
          setUsernameEmail(usernameInput, emailInput);
          router.push("/signup/password");
        },
        onError: (error) => {
          if (isAxiosError(error) && error.response?.data?.error) {
            const errorMessage = error.response.data.error;
            if (errorMessage.includes("아이디")) {
              setUsernameError(errorMessage);
            } else if (errorMessage.includes("이메일")) {
              setEmailError(errorMessage);
            } else {
              setEmailError("오류가 발생했습니다. 다시 시도해주세요.");
            }
          } else {
            setEmailError("오류가 발생했습니다. 다시 시도해주세요.");
          }
        },
      }
    );
  };

  const value = useMemo<UsernameEmailContextType>(
    () => ({
      username: usernameInput,
      email: emailInput,
      usernameError,
      emailError,
      isButtonActive,
      setUsername: setUsernameInput,
      setEmail: setEmailInput,
      goToNextPage,
    }),
    [usernameInput, emailInput, isButtonActive, goToNextPage]
  );

  return (
    <UsernameEmailContext.Provider value={value}>
      {children}
    </UsernameEmailContext.Provider>
  );
}

export function useUsernameEmail() {
  const context = useContext(UsernameEmailContext);
  if (!context) {
    throw new Error(
      "useUsernameEmail must be used within a UsernameEmailProvider"
    );
  }
  return context;
}
