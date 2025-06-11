import { useEffect, useMemo } from "react";

import {
  InquiriesListContextType,
  InquiriesListContext,
} from "./useInquiriesList";
import { useInquiries } from "@entities/inquiries";
import { useAlert } from "@shared/lib/alert";

export function InquiriesListProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { showAlert } = useAlert();
  const { data: inquiries, isLoading, isError } = useInquiries();

  useEffect(() => {
    if (isError) {
      showAlert({
        title: "오류 발생",
        message: "문의 내역을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
      });
    }
  }, [isError]);

  const value: InquiriesListContextType = useMemo(
    () => ({
      inquiries: inquiries ?? [],
      isLoading,
    }),
    [inquiries, isLoading]
  );

  return (
    <InquiriesListContext.Provider value={value}>
      {children}
    </InquiriesListContext.Provider>
  );
}
