import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, type AxiosResponse } from "axios";

import type {
  AdminCatchBAnnouncementsType,
  NewCatchBAnnouncementFormValues,
} from "../models/types";
import type { APIErrorResponse } from "@shared/api";

async function createAnnouncement(
  data: NewCatchBAnnouncementFormValues
): Promise<AxiosResponse<AdminCatchBAnnouncementsType>> {
  return await axios.post<AdminCatchBAnnouncementsType>(
    "/api/admin/v1/announcements/",
    data
  );
}

export function useCreateAnnouncement() {
  return useMutation<
    AxiosResponse<AdminCatchBAnnouncementsType>,
    AxiosError<APIErrorResponse>,
    NewCatchBAnnouncementFormValues
  >({
    mutationFn: (data) => createAnnouncement(data),
  });
}
