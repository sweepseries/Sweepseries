import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { FAQForm, type FAQFormType } from "../models/contexts";
import type { FAQCategoryType, FAQListResponseType } from "../models/types";

export function FAQFormProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Define state and functions for the form
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<FAQCategoryType | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<FAQCategoryType[]>([]);

  const queryClient = useQueryClient();

  const resetForm = useCallback(() => {
    setQuestion("");
    setAnswer("");
    setSelectedCategory(null);
    setCategoryOptions([]);
  }, []);

  useEffect(() => {
    const existingData = queryClient.getQueryData<FAQListResponseType>([
      "faqs",
    ]);

    if (existingData) {
      // remove "전체" from categories if it exists
      const filteredCategories = existingData.categories.filter(
        (category) => category.name !== "전체"
      );
      setCategoryOptions(filteredCategories);
      setSelectedCategory(
        filteredCategories.length > 0 ? filteredCategories[0] : null
      );
    }
  }, [queryClient]);

  const value = useMemo<FAQFormType>(
    () => ({
      question,
      answer,
      selectedCategory,
      categoryOptions,
      setQuestion,
      setAnswer,
      setSelectedCategory,
      resetForm,
    }),
    [question, answer, selectedCategory, categoryOptions, resetForm]
  );

  return <FAQForm.Provider value={value}>{children}</FAQForm.Provider>;
}
