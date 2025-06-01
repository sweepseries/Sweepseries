import { createContext } from "react";

import type { AdminCatchBAnnouncementDetailType } from "@entities/announcements";

export type AnnouncementDetailsContextType = {
  announcementDetails: AdminCatchBAnnouncementDetailType | null;
  isLoading: boolean;
};

export const AnnouncementDetailsContext = createContext<
  AnnouncementDetailsContextType | undefined
>(undefined);
