import { createContext } from "react";

import type { AdminTermsAndConditionsType } from "@entities/terms";

export type TermsListContextType = {
  mode: "전체" | "유효" | "무효";
  setMode: (mode: "전체" | "유효" | "무효") => void;
  terms: AdminTermsAndConditionsType[];
  isLoading: boolean;
};

export const TermsListContext = createContext<TermsListContextType | undefined>(
  undefined
);
