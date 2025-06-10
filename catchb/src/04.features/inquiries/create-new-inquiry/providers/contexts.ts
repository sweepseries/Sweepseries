import { createContext } from "react";

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
}

export const InquiryFormContext = createContext<
  InquiryFormContextType | undefined
>(undefined);
