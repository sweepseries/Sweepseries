import { createContext, useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";

import { InquiryCategoryType } from "@entities/inquiries";

export interface InquiryFormContextType {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  category: InquiryCategoryType;
  setCategory: (category: InquiryCategoryType) => void;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  isOpen: boolean;
  isGuestMode: boolean;
  openForm: () => void;
  closeForm: () => void;
  submitForm: () => Promise<void>;
  scrollRef: React.RefObject<ScrollView>;
}

export const InquiryFormContext = createContext<
  InquiryFormContextType | undefined
>(undefined);

export function useInquiryForm() {
  const context = useContext(InquiryFormContext);
  if (!context) {
    throw new Error("useInquiryForm must be used within a InquiryFormProvider");
  }
  return context;
}
