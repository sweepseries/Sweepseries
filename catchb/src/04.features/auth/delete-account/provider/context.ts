import { createContext } from "react";

export interface WithdrawSheetContextType {
  openSheet: () => void;
}

export const WithdrawSheetContext = createContext<
  WithdrawSheetContextType | undefined
>(undefined);
