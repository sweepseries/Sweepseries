import type { AdminCatchBAnnouncementSimpleType } from "./types";

export const sampleAnnouncements: AdminCatchBAnnouncementSimpleType[] = [
  {
    id: 1,
    title: "Announcement 1",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    is_deleted: true,
    is_important: false,
  },
  {
    id: 2,
    title: "Announcement 2",
    created_at: "2025-01-02T00:00:00Z",
    updated_at: "2025-01-02T00:00:00Z",
    is_deleted: false,
    is_important: true,
  },
];

export const sampleAnnouncementDetail = {
  id: 2,
  title: "Announcement 2",
  content: "This is the content of Announcement 2.",
  created_at: "2025-01-02T00:00:00Z",
  updated_at: "2025-01-02T00:00:00Z",
  is_deleted: false,
  is_important: true,
};
