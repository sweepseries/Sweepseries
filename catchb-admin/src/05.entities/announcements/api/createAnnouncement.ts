import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, type AxiosResponse } from "axios";

import type {
  AdminCatchBAnnouncementSimpleType,
  NewCatchBAnnouncementFormValues,
} from "../models/types";
import type { APIErrorResponse } from "@shared/api";

async function createAnnouncement(
  data: NewCatchBAnnouncementFormValues
): Promise<AxiosResponse<AdminCatchBAnnouncementSimpleType>> {
  return await axios.post<AdminCatchBAnnouncementSimpleType>(
    "/api/admin/v1/announcements/",
    data
  );
}

export function useCreateAnnouncement() {
  return useMutation<
    AxiosResponse<AdminCatchBAnnouncementSimpleType>,
    AxiosError<APIErrorResponse>,
    NewCatchBAnnouncementFormValues
  >({
    mutationFn: (data) => createAnnouncement(data),
  });
}
