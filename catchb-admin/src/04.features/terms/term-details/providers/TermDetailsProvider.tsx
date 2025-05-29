import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  type TermDetailsContextType,
  TermDetailsContext,
} from "../models/context";
import { useRetrieveTerm } from "@entities/terms";

export function TermDetailsProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id || isNaN(Number(id))) {
    window.alert("오류가 발생했습니다. 다시 시도해주세요.");
    navigate("/terms");
    return null;
  }

  return <InnerProvider termId={Number(id)}>{children}</InnerProvider>;
}

function InnerProvider({
  termId,
  children,
}: Readonly<{
  termId: number;
  children: React.ReactNode;
}>) {
  const [selectedVersionId, setSelectedVersionId] = useState<number>(-1);
  const [editMode, setEditMode] = useState<boolean>(false);

  const { data: termDetails, isLoading, isError } = useRetrieveTerm(termId);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      window.alert("약관 상세 정보를 불러오는 데 실패했습니다.");
      navigate("/terms");
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (termDetails) {
      setSelectedVersionId(termDetails.latest_version_id);
    }
  }, [termDetails]);

  const value = useMemo<TermDetailsContextType>(
    () => ({
      termDetails: termDetails ?? null,
      isLoading,
      selectedVersionId,
      setSelectedVersionId,
      editMode,
      setEditMode,
    }),
    [termDetails, isLoading, selectedVersionId, editMode]
  );

  return (
    <TermDetailsContext.Provider value={value}>
      {children}
    </TermDetailsContext.Provider>
  );
}
