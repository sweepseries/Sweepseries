import { useContext } from "react";

import { TermsListContext } from "../models/context";

export const useTermsList = () => {
  const context = useContext(TermsListContext);
  if (!context) {
    throw new Error("useTermsList must be used within a TermsListProvider");
  }
  return context;
};
