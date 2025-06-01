import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { AdminCatchBAnnouncementSimpleType } from "../models/types";
import type { APIErrorResponse } from "@shared/api";

async function fetchAllAnnouncements(): Promise<
  AdminCatchBAnnouncementSimpleType[]
> {
  const response = await axios.get<AdminCatchBAnnouncementSimpleType[]>(
    "/api/admin/v1/announcements/"
  );

  return response.data;
}

export function useAnnouncements() {
  return useQuery<AdminCatchBAnnouncementSimpleType[], APIErrorResponse>({
    queryKey: ["announcements"],
    queryFn: fetchAllAnnouncements,
  });
}
