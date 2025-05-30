import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { AdminCatchBAnnouncementsType } from "../models/types";
import type { APIErrorResponse } from "@shared/api";

async function fetchAllAnnouncements(): Promise<
  AdminCatchBAnnouncementsType[]
> {
  const response = await axios.get<AdminCatchBAnnouncementsType[]>(
    "/api/admin/v1/announcements/"
  );

  return response.data;
}

export function useAnnouncements() {
  return useQuery<AdminCatchBAnnouncementsType[], APIErrorResponse>({
    queryKey: ["announcements"],
    queryFn: fetchAllAnnouncements,
  });
}
