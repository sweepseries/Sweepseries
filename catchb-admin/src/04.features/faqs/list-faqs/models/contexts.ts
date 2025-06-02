import { createContext } from "react";

import type { AdminCatchBFAQSimpleType, FAQCategoryType } from "@entities/faqs";

export type FAQsListContextType = {
  selectedCategory: FAQCategoryType | undefined;
  setSelectedCategory: (category: FAQCategoryType) => void;
  faqs: AdminCatchBFAQSimpleType[];
  categoryOptions: FAQCategoryType[];
  isLoading: boolean;
};

export const FAQsListContext = createContext<FAQsListContextType | undefined>(
  undefined
);
