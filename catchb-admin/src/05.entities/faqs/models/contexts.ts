import { createContext } from "react";

import type { FAQCategoryType } from "./types";

export type FAQFormType = {
  question: string;
  answer: string;
  selectedCategory: FAQCategoryType | null;
  categoryOptions: FAQCategoryType[];
  setQuestion: (question: string) => void;
  setAnswer: (answer: string) => void;
  setSelectedCategory: (category: FAQCategoryType) => void;
  resetForm: () => void;
};

export const FAQForm = createContext<FAQFormType | undefined>(undefined);
