import { useContext } from "react";

import { LoginFormContext } from "../models/context";

export function useLoginForm() {
  const context = useContext(LoginFormContext);

  if (!context) {
    throw new Error("useLoginForm must be used within a LoginFormProvider");
  }

  return context;
}
