import { createContext } from "react";

export interface ProfileFormContextType {
  nickname: string;
  birthYear: string;
  birthMonth: string;
  birthDate: string;
  gender: string;
  setNickname: (nickname: string) => void;
  setBirthYear: (year: string) => void;
  setBirthMonth: (month: string) => void;
  setBirthDate: (date: string) => void;
  setGender(gender: string): void;
  submit: (mode: "submit" | "skip") => Promise<void>;
}

export const ProfileFormContext = createContext<
  ProfileFormContextType | undefined
>(undefined);
