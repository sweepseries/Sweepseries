import type { AdminCatchBAnnouncementsType } from "./types";

export const sampleAnnouncements: AdminCatchBAnnouncementsType[] = [
  {
    id: 1,
    title: "Announcement 1",
    content: "Content for announcement 1",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    is_deleted: true,
  },
  {
    id: 2,
    title: "Announcement 2",
    content: "Content for announcement 2",
    created_at: "2025-01-02T00:00:00Z",
    updated_at: "2025-01-02T00:00:00Z",
    is_deleted: false,
  },
];
