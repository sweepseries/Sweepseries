import { useContext } from "react";

import { TermDetailsContext } from "../models/context";

export const useTermDetails = () => {
  const context = useContext(TermDetailsContext);
  if (!context) {
    throw new Error("useTermDetails must be used within a TermDetailsProvider");
  }
  return context;
};
