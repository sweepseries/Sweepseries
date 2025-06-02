import { useEffect, useMemo, useState } from "react";

import { type FAQsListContextType, FAQsListContext } from "../models/contexts";
import { useFAQs, type FAQCategoryType } from "@entities/faqs";

export function FAQListProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedCategory, setSelectedCategory] = useState<FAQCategoryType>();
  const { data, isLoading, isError } = useFAQs();

  useEffect(() => {
    if (isError) {
      window.alert("자주 묻는 질문 목록을 불러오는 데 실패했습니다.");
    }
  }, [isError]);

  useEffect(() => {
    if (!data) return;

    setSelectedCategory(data.categories[0]);
  }, [data]);

  const faqs = useMemo(() => {
    if (!data || !selectedCategory) return [];
    return data.faqs[selectedCategory.name];
  }, [data, selectedCategory]);

  const categoryOptions = useMemo(() => {
    if (!data) return [];
    return data.categories;
  }, [data]);

  const value = useMemo<FAQsListContextType>(
    () => ({
      selectedCategory: selectedCategory,
      setSelectedCategory: (category) => setSelectedCategory(category),
      faqs,
      categoryOptions,
      isLoading: isLoading,
    }),
    [selectedCategory, faqs, categoryOptions, isLoading]
  );

  return (
    <FAQsListContext.Provider value={value}>
      {children}
    </FAQsListContext.Provider>
  );
}
