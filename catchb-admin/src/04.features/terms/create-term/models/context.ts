import { createContext } from "react";

export type CreateTermContextType = {
  title: string;
  content: string;
  isRequired: boolean;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  toggleIsRequired: () => void;
  submit: () => void;
};

export const CreateTermContext = createContext<
  CreateTermContextType | undefined
>(undefined);
