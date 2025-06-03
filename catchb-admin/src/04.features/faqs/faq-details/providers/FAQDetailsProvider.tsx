import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";

import {
  type FAQDetailsContextType,
  FAQDetailsContext,
} from "../models/contexts";
import { useRetrieveFAQ } from "@entities/faqs";

export function FAQDetailsProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id || isNaN(Number(id))) {
    window.alert("오류가 발생했습니다. 다시 시도해주세요.");
    navigate("/faqs");
    return null;
  }

  return <InnerProvider faqId={Number(id)}>{children}</InnerProvider>;
}

function InnerProvider({
  faqId,
  children,
}: Readonly<{
  faqId: number;
  children: React.ReactNode;
}>) {
  const { data: faqDetails, isLoading, isError } = useRetrieveFAQ(faqId);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      window.alert("정보를 불러오는 데 실패했습니다.");
      navigate("/faqs");
    }
  }, [isError, navigate]);

  const value = useMemo<FAQDetailsContextType>(
    () => ({
      faqDetails: faqDetails ?? null,
      isLoading,
    }),
    [faqDetails, isLoading]
  );

  return (
    <FAQDetailsContext.Provider value={value}>
      {children}
    </FAQDetailsContext.Provider>
  );
}
