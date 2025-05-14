import { createContext } from "react";

export interface InquiryFormContextType {
  isOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
}

export const InquiryFormContext = createContext<
  InquiryFormContextType | undefined
>(undefined);
