import { useContext } from "react";

import { FAQDetailsContext } from "../models/contexts";

export const useFAQDetails = () => {
  const context = useContext(FAQDetailsContext);
  if (!context) {
    throw new Error("useFAQDetails must be used within a FAQDetailsProvider");
  }
  return context;
};
