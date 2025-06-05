import { useContext } from "react";

import { InquiriesListContext } from "../models/contexts";

export const useInquiriesList = () => {
  const context = useContext(InquiriesListContext);
  if (!context) {
    throw new Error(
      "useInquiriesList must be used within an InquiriesListProvider"
    );
  }
  return context;
};
