import { createContext } from "react";

import type { InquiryThreadDetailType } from "@entities/inquiries";

export type InquiryDetailsContextType = {
  inquiryDetails: InquiryThreadDetailType | null;
  mode: "노트" | "답변";
  toggleMode: () => void;
  isLoading: boolean;
};

export const InquiryDetailsContext = createContext<
  InquiryDetailsContextType | undefined
>(undefined);
