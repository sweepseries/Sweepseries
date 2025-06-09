import { useContext } from "react";

import { CommunityProfileContext } from "../models/contexts";

export function useCommunityProfiles() {
  const context = useContext(CommunityProfileContext);
  if (!context) {
    throw new Error(
      "useCommunityProfiles must be used within a CommunityProfileProvider"
    );
  }
  return context;
}
