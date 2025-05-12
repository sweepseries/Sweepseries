import { createContext } from "react";

export interface UsernameEmailContextType {
  username: string;
  email: string;
  usernameError: string;
  emailError: string;
  isButtonActive: boolean;
  setUsername: (value: string) => void;
  setEmail: (value: string) => void;
  goToNextPage: () => void;
}

export const UsernameEmailContext = createContext<
  UsernameEmailContextType | undefined
>(undefined);
