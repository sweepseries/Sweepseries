import { createContext } from "react";

import { TermsAndConditionsType } from "@entities/terms";

interface TermsContextType {
  terms: TermsAndConditionsType[] | undefined;
  isLoading: boolean;
  isAllChecked: boolean;
  buttonActive: boolean;
  isTermChecked: (id: number) => boolean;
  toggleAll: () => void;
  toggleCheckTerm: (id: number) => void;
}

export const TermsListContext = createContext<TermsContextType | undefined>(
  undefined
);

export type TermsAndConditionsCheckType = {
  id: number;
  is_checked: boolean;
  is_required: boolean;
};
