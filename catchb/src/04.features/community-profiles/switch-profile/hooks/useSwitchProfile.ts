import { useContext } from "react";

import { SwitchProfileContext } from "../models/contexts";

export function useSwitchProfile() {
  const context = useContext(SwitchProfileContext);
  if (!context) {
    throw new Error(
      "useSwitchProfile must be used within a SwitchProfileProvider"
    );
  }
  return context;
}
