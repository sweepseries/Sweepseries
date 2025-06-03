import { useContext } from "react";

import { FAQsListContext } from "../models/contexts";

export const useFAQList = () => {
  const context = useContext(FAQsListContext);
  if (!context) {
    throw new Error("useFAQList must be used within a FAQListProvider");
  }
  return context;
};
