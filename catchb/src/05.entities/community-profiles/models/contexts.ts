import { createContext } from "react";

import { CommunityProfileType } from "./types";

export interface CommunityProfileContextType {
  activeProfile: CommunityProfileType | null;
  switchProfile: (profile: CommunityProfileType) => void;
  profiles: CommunityProfileType[];
}

export const CommunityProfileContext = createContext<
  CommunityProfileContextType | undefined
>(undefined);
