import { useContext } from "react";

import { InquiryDetailsContext } from "../models/contexts";

export const useInquiryDetails = () => {
  const context = useContext(InquiryDetailsContext);
  if (!context) {
    throw new Error(
      "useInquiryDetails must be used within an InquiryDetailsProvider"
    );
  }
  return context;
};
