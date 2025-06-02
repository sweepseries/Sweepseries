import { createContext } from "react";

export type CreateTermContextType = {
  title: string;
  isRequired: boolean;
  setTitle: (title: string) => void;
  setIsRequired: (isRequired: boolean) => void;
};

export const CreateTermContext = createContext<
  CreateTermContextType | undefined
>(undefined);
