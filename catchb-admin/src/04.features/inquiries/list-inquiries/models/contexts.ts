import { createContext } from "react";

import type {
  InquiryThreadType,
  InquiryCategoryType,
  InquiryStatusType,
} from "@entities/inquiries";

export type InquiriesListContextType = {
  inquiries: InquiryThreadType[];
  isLoading: boolean;
  selectedCategory: InquiryCategoryType | undefined;
  setSelectedCategory: (category: InquiryCategoryType) => void;
  selectedStatus: InquiryStatusType | undefined;
  setSelectedStatus: (status: InquiryStatusType) => void;
  mode: "상태별" | "분류별";
  setMode: (newMode: "상태별" | "분류별") => void;
  categoryOptions: InquiryCategoryType[];
  statusOptions: InquiryStatusType[];
};

export const InquiriesListContext = createContext<
  InquiriesListContextType | undefined
>(undefined);
