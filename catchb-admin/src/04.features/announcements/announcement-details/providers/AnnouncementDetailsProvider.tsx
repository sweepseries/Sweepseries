import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";

import {
  type AnnouncementDetailsContextType,
  AnnouncementDetailsContext,
} from "../models/context";
import { useRetrieveAnnouncement } from "@entities/announcements";

export function AnnouncementDetailsProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id || isNaN(Number(id))) {
    window.alert("오류가 발생했습니다. 다시 시도해주세요.");
    navigate("/announcements");
    return null;
  }

  return <InnerProvider announcementId={Number(id)}>{children}</InnerProvider>;
}

function InnerProvider({
  announcementId,
  children,
}: Readonly<{
  announcementId: number;
  children: React.ReactNode;
}>) {
  const {
    data: announcementDetails,
    isLoading,
    isError,
  } = useRetrieveAnnouncement(announcementId);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      window.alert("공지사항 상세 정보를 불러오는 데 실패했습니다.");
      navigate("/announcements");
    }
  }, [isError, navigate]);

  const value = useMemo<AnnouncementDetailsContextType>(
    () => ({
      announcementDetails: announcementDetails ?? null,
      isLoading,
    }),
    [announcementDetails, isLoading]
  );

  return (
    <AnnouncementDetailsContext.Provider value={value}>
      {children}
    </AnnouncementDetailsContext.Provider>
  );
}
