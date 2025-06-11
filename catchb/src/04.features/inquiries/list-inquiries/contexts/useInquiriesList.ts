import { createContext, useContext } from "react";

import { InquiryThreadType } from "@entities/inquiries";

export interface InquiriesListContextType {
  inquiries: InquiryThreadType[];
  isLoading: boolean;
}

export const InquiriesListContext = createContext<
  InquiriesListContextType | undefined
>(undefined);

export const useInquiriesList = (): InquiriesListContextType => {
  const context = useContext(InquiriesListContext);
  if (!context) {
    throw new Error(
      "useInquiriesList must be used within an InquiriesListProvider"
    );
  }
  return context;
};
