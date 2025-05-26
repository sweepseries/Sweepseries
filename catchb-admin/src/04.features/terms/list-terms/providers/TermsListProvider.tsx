import { useEffect, useMemo, useState } from "react";

import { type TermsListContextType, TermsListContext } from "../models/context";
import { useTerms } from "@entities/terms";

export function TermsListProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: terms, isLoading, isError } = useTerms();
  const [mode, setMode] = useState<"전체" | "유효" | "무효">("전체");

  useEffect(() => {
    if (isError) {
      window.alert("약관 목록을 불러오는 데 실패했습니다.");
    }
  }, [isError]);

  const filteredTerms = useMemo(() => {
    if (!terms) return [];
    if (mode === "유효") return terms.filter((term) => term.is_active);
    if (mode === "무효") return terms.filter((term) => !term.is_active);
    return terms;
  }, [terms, mode]);

  const value = useMemo<TermsListContextType>(
    () => ({
      mode,
      setMode,
      terms: filteredTerms,
      isLoading,
    }),
    [mode, filteredTerms, isLoading]
  );

  return (
    <TermsListContext.Provider value={value}>
      {children}
    </TermsListContext.Provider>
  );
}
