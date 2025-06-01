import type { AdminCatchBAnnouncementSimpleType } from "@entities/announcements";

export function sortByCreatedAt(
  a: AdminCatchBAnnouncementSimpleType,
  b: AdminCatchBAnnouncementSimpleType,
  sortMode: "asc" | "desc" = "desc"
) {
  const dateA = new Date(a.created_at);
  const dateB = new Date(b.created_at);

  if (sortMode === "asc") {
    return dateA.getTime() - dateB.getTime();
  }
  return dateB.getTime() - dateA.getTime();
}

export function sortByUpdatedAt(
  a: AdminCatchBAnnouncementSimpleType,
  b: AdminCatchBAnnouncementSimpleType,
  sortMode: "asc" | "desc" = "desc"
) {
  const dateA = new Date(a.updated_at);
  const dateB = new Date(b.updated_at);

  if (sortMode === "asc") {
    return dateA.getTime() - dateB.getTime();
  }
  return dateB.getTime() - dateA.getTime();
}

export function sortByID(
  a: AdminCatchBAnnouncementSimpleType,
  b: AdminCatchBAnnouncementSimpleType,
  sortMode: "asc" | "desc" = "desc"
) {
  const idA = a.id;
  const idB = b.id;

  if (sortMode === "asc") {
    return idA - idB;
  }
  return idB - idA;
}
