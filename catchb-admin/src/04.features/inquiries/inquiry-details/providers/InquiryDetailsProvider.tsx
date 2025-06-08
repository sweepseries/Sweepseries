import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  type InquiryDetailsContextType,
  InquiryDetailsContext,
} from "../models/contexts";
import { useInquiryDetails } from "@entities/inquiries";

export function InquiryDetailsProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id || isNaN(Number(id))) {
    window.alert("오류가 발생했습니다. 다시 시도해주세요.");
    navigate("/inquiries");
    return null;
  }

  return <InnerProvider inquiryId={Number(id)}>{children}</InnerProvider>;
}

function InnerProvider({
  inquiryId,
  children,
}: Readonly<{
  inquiryId: number;
  children: React.ReactNode;
}>) {
  const [mode, setMode] = useState<"노트" | "답변">("노트");
  const {
    data: inquiryDetails,
    isLoading,
    isError,
  } = useInquiryDetails(inquiryId);
  const navigate = useNavigate();

  const toggleMode = useCallback(() => {
    setMode((prevMode) => (prevMode === "노트" ? "답변" : "노트"));
  }, []);

  useEffect(() => {
    if (isError) {
      window.alert("문의 상세 정보를 불러오는 데 실패했습니다.");
      navigate("/inquiries");
    }
  }, [isError, navigate]);

  const value = useMemo<InquiryDetailsContextType>(
    () => ({
      inquiryDetails: inquiryDetails ?? null,
      mode,
      toggleMode,
      isLoading,
    }),
    [inquiryDetails, isLoading, mode, toggleMode]
  );

  return (
    <InquiryDetailsContext.Provider value={value}>
      {children}
    </InquiryDetailsContext.Provider>
  );
}
