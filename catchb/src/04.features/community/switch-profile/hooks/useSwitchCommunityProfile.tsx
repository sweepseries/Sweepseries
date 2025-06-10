import { useContext } from "react";

import { SwitchCommunityProfileContext } from "../models/contexts";

export function useSwitchCommunityProfile() {
  const context = useContext(SwitchCommunityProfileContext);

  if (!context) {
    throw new Error(
      "useSwitchCommunityProfile must be used within a SwitchCommunityProfileProvider"
    );
  }

  return context;
}
