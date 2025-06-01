import { createContext } from "react";

import type { AdminCatchBAnnouncementSimpleType } from "@entities/announcements";

export type AnnouncementsListContextType = {
  mode: "전체" | "유효" | "삭제됨";
  setMode: (mode: "전체" | "유효" | "삭제됨") => void;
  announcements: AdminCatchBAnnouncementSimpleType[];
  sort: "ID" | "생성일" | "수정일" | "기본";
  setSort: (sort: "ID" | "생성일" | "수정일" | "기본") => void;
  sortMode: "asc" | "desc";
  setSortMode: (sortMode: "asc" | "desc") => void;
  isLoading: boolean;
};

export const AnnouncementsListContext = createContext<
  AnnouncementsListContextType | undefined
>(undefined);
