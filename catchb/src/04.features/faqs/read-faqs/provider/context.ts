import { createContext } from "react";

import { FAQType } from "@entities/faqs";

export interface FAQListContextType {
  faqs: FAQType[];
  isLoading: boolean;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedFAQId: number;
  setSelectedFAQId: (id: number) => void;
}

export const FAQListContext = createContext<FAQListContextType | undefined>(
  undefined
);
