import { createContext } from "react";

import { InitialRegisterDataType } from "../models/types";

export interface SignupContextType {
  setNotificationsAgreed: (agreed: boolean) => void;
  setUsernameEmail: (username: string, email: string) => void;
  setPasswords: (password: string, password2: string) => void;
  setNamePhone: (name: string, phone: string) => void;
  data: InitialRegisterDataType;
}

export const SignupContext = createContext<SignupContextType | undefined>(
  undefined
);
