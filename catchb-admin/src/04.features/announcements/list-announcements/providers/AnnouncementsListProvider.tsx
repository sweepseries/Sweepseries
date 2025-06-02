import { useEffect, useMemo, useState } from "react";

import {
  type AnnouncementsListContextType,
  AnnouncementsListContext,
} from "../models/context";
import {
  sortByCreatedAt,
  sortByUpdatedAt,
  sortByID,
} from "../utils/sortAnnouncements";
import { useAnnouncements } from "@entities/announcements";

export function AnnouncementsListProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: announcements, isLoading, isError } = useAnnouncements();
  const [mode, setMode] = useState<"전체" | "유효" | "삭제됨">("유효");
  const [sort, setSort] = useState<"ID" | "생성일" | "수정일" | "기본">("기본");
  const [sortMode, setSortMode] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    if (isError) {
      window.alert("공지사항 목록을 불러오는 데 실패했습니다.");
    }
  }, [isError]);

  const filteredAnnouncements = useMemo(() => {
    if (!announcements) return [];
    if (mode === "유효")
      return announcements.filter((announcement) => !announcement.is_deleted);
    if (mode === "삭제됨")
      return announcements.filter((announcement) => announcement.is_deleted);
    return announcements;
  }, [announcements, mode]);

  const sortedAnnouncements = useMemo(() => {
    if (sort === "생성일") {
      return [...filteredAnnouncements].sort((a, b) =>
        sortByCreatedAt(a, b, sortMode)
      );
    }
    if (sort === "수정일") {
      return [...filteredAnnouncements].sort((a, b) =>
        sortByUpdatedAt(a, b, sortMode)
      );
    }
    if (sort === "ID") {
      return [...filteredAnnouncements].sort((a, b) =>
        sortByID(a, b, sortMode)
      );
    }
    // 기본 정렬은 서버에서 제공하는 순서대로 유지
    return filteredAnnouncements;
  }, [filteredAnnouncements, sort, sortMode]);

  const value = useMemo<AnnouncementsListContextType>(
    () => ({
      mode,
      setMode,
      announcements: sortedAnnouncements,
      sort,
      setSort,
      sortMode,
      setSortMode,
      isLoading,
    }),
    [mode, isLoading, sort, sortMode, sortedAnnouncements]
  );

  return (
    <AnnouncementsListContext.Provider value={value}>
      {children}
    </AnnouncementsListContext.Provider>
  );
}
