import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { AnnouncementType } from "../models/types";

async function fetchAnnouncements(): Promise<AnnouncementType[]> {
  const response = await axios.get("/api/v1/announcements/");

  return response.data;
}

export function useAnnouncements() {
  return useQuery<AnnouncementType[], Error>({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
  });
}
