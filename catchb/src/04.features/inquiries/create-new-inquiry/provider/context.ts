import { InquiryCategoryType } from "@entities/inquiries";
import { createContext } from "react";

export interface InquiryFormContextType {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  category: InquiryCategoryType | null;
  setCategory: (category: InquiryCategoryType) => void;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  isOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
}

export const InquiryFormContext = createContext<
  InquiryFormContextType | undefined
>(undefined);
