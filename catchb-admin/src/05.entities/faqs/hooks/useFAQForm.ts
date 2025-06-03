import { useContext } from "react";

import { FAQForm } from "../models/contexts";

export const useFAQForm = () => {
  const context = useContext(FAQForm);
  if (!context) {
    throw new Error("useFAQForm must be used within a FAQFormProvider");
  }
  return context;
};
