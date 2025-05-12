import { useContext, useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import { isAxiosError } from "axios";

import { ProfileFormContext, ProfileFormContextType } from "./context";
import { useAlert } from "@shared/lib/alert";
import { useRegister, useSignup } from "@shared/lib/signup";

export function ProfileFormProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [nickname, setNickname] = useState<string>("");
  const [birthYear, setBirthYear] = useState<string>("");
  const [birthMonth, setBirthMonth] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [gender, setGender] = useState<string>("남성");

  const { showAlert } = useAlert();
  const { mutate: register } = useRegister();
  const { data } = useSignup();

  const goToLoginPage = () => {
    showAlert({
      title: "회원가입 완료",
      message: "회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.",
      onConfirm: () => {
        router.dismissAll();
        if (data.mode === "catchb") {
          router.replace("/login");
        } else {
          router.replace("/");
        }
      },
    });
  };

  const submit = async (mode: "submit" | "skip") => {
    register(
      {
        ...data,
        nickname: nickname || null,
        birth_year: birthYear,
        birth_month: birthMonth,
        birth_day: birthDate,
        gender: mode === "submit" ? gender : null,
        route: mode,
      },
      {
        onSuccess: () => {
          goToLoginPage();
        },
        onError: (error) => {
          if (isAxiosError(error) && error.response?.data?.error) {
            const errorMessage = error.response.data.error;
            showAlert({
              title: "오류",
              message: errorMessage,
            });
          } else {
            showAlert({
              title: "오류",
              message: "오류가 발생했습니다. 다시 시도해주세요.",
            });
          }
        },
      }
    );
  };

  useEffect(() => {
    if (data.mode !== "catchb") {
      setNickname(data.nickname || "");
      setGender(data.gender);
      setBirthYear(data.birth_year || "");
      setBirthMonth(data.birth_month || "");
      setBirthDate(data.birth_day || "");
    }
  }, [data.mode]);

  const value = useMemo<ProfileFormContextType>(
    () => ({
      nickname,
      birthYear,
      birthMonth,
      birthDate,
      gender,
      setNickname,
      setBirthYear,
      setBirthMonth,
      setBirthDate,
      setGender,
      submit,
    }),
    [nickname, birthYear, birthMonth, birthDate, gender]
  );

  return (
    <ProfileFormContext.Provider value={value}>
      {children}
    </ProfileFormContext.Provider>
  );
}

export function useProfileForm() {
  const context = useContext(ProfileFormContext);
  if (!context) {
    throw new Error("useProfileForm must be used within a ProfileFormProvider");
  }
  return context;
}
