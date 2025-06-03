import { createContext } from "react";

import type { AdminCatchBFAQDetailType } from "@entities/faqs";

export type FAQDetailsContextType = {
  faqDetails: AdminCatchBFAQDetailType | null;
  isLoading: boolean;
};

export const FAQDetailsContext = createContext<
  FAQDetailsContextType | undefined
>(undefined);
