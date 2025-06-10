import { createContext } from "react";

export interface SwitchCommunityProfileContextType {
  openSheet: () => void;
}

export const SwitchCommunityProfileContext = createContext<
  SwitchCommunityProfileContextType | undefined
>(undefined);
