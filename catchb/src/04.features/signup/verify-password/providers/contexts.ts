import { createContext } from "react";

export interface PasswordVerificationContextType {
  password: string;
  password2: string;
  passwordError: string;
  setPassword: (value: string) => void;
  setPassword2: (value: string) => void;
  goToNextPage: () => void;
}

export const PasswordVerificationContext = createContext<
  PasswordVerificationContextType | undefined
>(undefined);
