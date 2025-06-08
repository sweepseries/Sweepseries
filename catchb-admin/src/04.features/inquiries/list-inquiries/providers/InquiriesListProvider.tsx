import { useEffect, useMemo, useState } from "react";

import {
  type InquiriesListContextType,
  InquiriesListContext,
} from "../models/contexts";
import {
  useInquiries,
  type InquiryCategoryType,
  type InquiryStatusType,
} from "@entities/inquiries";

export function InquiriesListProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mode, setMode] = useState<"상태별" | "분류별">("상태별");
  const [selectedCategory, setSelectedCategory] =
    useState<InquiryCategoryType>();
  const [selectedStatus, setSelectedStatus] = useState<InquiryStatusType>();
  const { data, isLoading, isError } = useInquiries();

  useEffect(() => {
    if (isError) {
      window.alert("문의 목록을 불러오는 데 실패했습니다.");
    }
  }, [isError]);

  useEffect(() => {
    if (!data) return;

    if (!selectedCategory && !selectedStatus) {
      // If no category or status is selected, set defaults
      setSelectedCategory(data.categories[0]);
      setSelectedStatus(data.status[0]);
    }
  }, [data, selectedCategory, selectedStatus]);

  const inquiries = useMemo(() => {
    if (!data || !selectedCategory || !selectedStatus) return [];

    if (mode === "상태별") {
      return data.inquiries.filter(
        (inquiry) => inquiry.status.id === selectedStatus.id
      );
    } else {
      return data.inquiries.filter(
        (inquiry) => inquiry.category.id === selectedCategory.id
      );
    }
  }, [data, selectedCategory, selectedStatus, mode]);

  const categoryOptions = useMemo(() => {
    if (!data) return [];
    return data.categories;
  }, [data]);

  const statusOptions = useMemo(() => {
    if (!data) return [];
    return data.status;
  }, [data]);

  const value = useMemo<InquiriesListContextType>(
    () => ({
      inquiries,
      isLoading,
      selectedCategory,
      setSelectedCategory: (category) => setSelectedCategory(category),
      selectedStatus,
      setSelectedStatus: (status) => setSelectedStatus(status),
      mode,
      setMode: (newMode) => setMode(newMode),
      categoryOptions,
      statusOptions,
    }),
    [
      inquiries,
      isLoading,
      selectedCategory,
      selectedStatus,
      mode,
      categoryOptions,
      statusOptions,
    ]
  );

  return (
    <InquiriesListContext.Provider value={value}>
      {children}
    </InquiriesListContext.Provider>
  );
}
