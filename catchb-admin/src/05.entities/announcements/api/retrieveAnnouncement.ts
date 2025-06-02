import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { AdminCatchBAnnouncementDetailType } from "../models/types";
import type { APIErrorResponse } from "@shared/api";

async function fetchAnnouncementDetails(
  announcementId: number
): Promise<AdminCatchBAnnouncementDetailType> {
  const response = await axios.get<AdminCatchBAnnouncementDetailType>(
    `/api/admin/v1/announcements/${announcementId}/`
  );
  return response.data;
}

export function useRetrieveAnnouncement(announcementId: number) {
  return useQuery<AdminCatchBAnnouncementDetailType, APIErrorResponse>({
    queryKey: ["announcementDetails", announcementId],
    queryFn: () => fetchAnnouncementDetails(announcementId),
    enabled: !!announcementId, // Only run the query if announcementId is defined
  });
}
