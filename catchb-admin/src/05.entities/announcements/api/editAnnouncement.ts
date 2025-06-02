import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, type AxiosResponse } from "axios";

import type {
  AdminCatchBAnnouncementDetailType,
  CatchBAnnouncementFormValues,
} from "../models/types";
import type { APIErrorResponse } from "@shared/api";

async function editAnnouncement(
  announcementId: number,
  data: CatchBAnnouncementFormValues
): Promise<AxiosResponse<AdminCatchBAnnouncementDetailType>> {
  return await axios.put<AdminCatchBAnnouncementDetailType>(
    `/api/admin/v1/announcements/${announcementId}/`,
    data
  );
}

export function useEditAnnouncement(announcementId: number) {
  return useMutation<
    AxiosResponse<AdminCatchBAnnouncementDetailType>,
    AxiosError<APIErrorResponse>,
    CatchBAnnouncementFormValues
  >({
    mutationFn: (data) => editAnnouncement(announcementId, data),
  });
}
