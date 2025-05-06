import { createContext } from "react";

import { RegisterDataType } from "../models/register";

export interface SignupContextType {
  setNotificationsAgreed: (agreed: boolean) => void;
  setUsernameEmail: (username: string, email: string) => void;
  setPasswords: (password: string, password2: string) => void;
  setNamePhone: (name: string, phone: string) => void;
  data: RegisterDataType;
}

export const SignupContext = createContext<SignupContextType | undefined>(
  undefined
);
