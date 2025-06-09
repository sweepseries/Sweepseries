import { createContext } from "react";

export interface SwitchProfileContextType {
  toggleSheet: () => void;
}

export const SwitchProfileContext = createContext<
  SwitchProfileContextType | undefined
>(undefined);
