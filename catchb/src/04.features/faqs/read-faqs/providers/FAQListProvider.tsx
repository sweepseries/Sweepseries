import { useContext, useEffect, useMemo, useState } from "react";
import { router } from "expo-router";

import { FAQListContext, FAQListContextType } from "./contexts";
import { useFAQs } from "@entities/faqs";
import { useAlert } from "@shared/lib/alert";

export function FAQListProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [selectedFAQId, setSelectedFAQId] = useState<number>(-1);

  const { data, isLoading, isError } = useFAQs();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (isError) {
      showAlert({
        title: "오류 발생",
        message: "FAQ를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.",
        onConfirm: () => {
          router.back();
        },
      });
    }
  }, [isError]);

  const faqs = useMemo(
    () => data?.faqs[selectedCategory] ?? [],
    [data, selectedCategory]
  );

  const categories = useMemo(() => data?.categories ?? [], [data]);

  const value = useMemo<FAQListContextType>(
    () => ({
      faqs,
      categories,
      isLoading,
      selectedCategory,
      setSelectedCategory,
      selectedFAQId,
      setSelectedFAQId,
    }),
    [data, isLoading, selectedCategory, faqs, categories, selectedFAQId]
  );

  return (
    <FAQListContext.Provider value={value}>{children}</FAQListContext.Provider>
  );
}

export const useFAQList = () => {
  const context = useContext(FAQListContext);
  if (!context) {
    throw new Error("useFAQList must be used within a FAQListProvider");
  }
  return context;
};
