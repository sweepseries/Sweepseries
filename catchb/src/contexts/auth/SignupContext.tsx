import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import { RegisterDataType } from "@models/auth";

interface SignupContextType {
  setNotificationsAgreed: (agreed: boolean) => void;
  setUsernameEmail: (username: string, email: string) => void;
  setPasswords: (password: string, password2: string) => void;
  setNamePhone: (name: string, phone: string) => void;
  data: RegisterDataType;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

type SignupParams = {
  mode: string;
  username: string;
  email: string;
  name: string;
  phone: string;
  birthday: string;
  birthyear: string;
  gender: string;
  nickname: string;
  profileImage: string;
};

export function SignupProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [mode, setMode] = useState<"catchb" | "naver" | "kakao">("catchb");

  const [notificationsAgreed, setNotificationsAgreed] =
    useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [gender, setGender] = useState<string>("");
  const [birthYear, setBirthYear] = useState<string>("");
  const [birthMonth, setBirthMonth] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");

  const params = useLocalSearchParams<SignupParams>();

  const setUsernameEmail = (username: string, email: string) => {
    setUsername(username);
    setEmail(email);
  };

  const setPasswords = (password: string, password2: string) => {
    setPassword(password);
    setPassword2(password2);
  };

  const setNamePhone = (name: string, phone: string) => {
    setName(name);
    setPhone(phone);
  };

  useEffect(() => {
    if (params.mode === "naver") {
      const getGender = () => {
        if (params.gender === "F") {
          return "여성";
        }

        return "남성";
      };

      setMode("naver");
      setUsername(params.username);
      setEmail(params.email);
      setName(params.name);
      setPhone(params.phone);
      setBirthYear(params.birthyear);
      setBirthMonth(params.birthday?.slice(0, 2) ?? "");
      setBirthDate(params.birthday?.slice(3, 5) ?? "");
      setGender(getGender());
      setNickname(params.nickname);
      setProfileImage(params.profileImage);
    } else if (params.mode === "kakao") {
      const getGender = () => {
        if (params.gender === "female") {
          return "여성";
        }

        return "남성";
      };

      setMode("kakao");
      setUsername(params.username || "");
      setEmail(params.email || "");
      setName(params.name || "");
      setPhone(params.phone || "");
      setBirthYear(params.birthyear || "");
      setBirthMonth(params.birthday?.slice(0, 2) || "");
      setBirthDate(params.birthday?.slice(2, 4) || "");
      setGender(getGender());
      setNickname(params.nickname || "");
      setProfileImage(params.profileImage || "");
    }
  }, []);

  const data = useMemo(
    () => ({
      mode,
      username,
      email,
      name,
      phone,
      notifications: notificationsAgreed,
      password,
      password2,
      birth_year: birthYear,
      birth_month: birthMonth,
      birth_day: birthDate,
      gender,
      nickname,
      profile_image: profileImage,
    }),
    [
      mode,
      username,
      email,
      name,
      phone,
      notificationsAgreed,
      password,
      password2,
      birthYear,
      birthMonth,
      birthDate,
      gender,
      nickname,
      profileImage,
    ]
  );

  const value = useMemo(
    () => ({
      setNotificationsAgreed,
      setUsernameEmail,
      setPasswords,
      setNamePhone,
      data,
    }),
    [data]
  );

  return (
    <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
  );
}

export const useSignup = (): SignupContextType => {
  const context = useContext(SignupContext);

  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider");
  }

  return context;
};
