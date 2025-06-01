import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import type { APIErrorResponse } from "@shared/api";

async function reactivateAnnouncement(announcementId: number): Promise<void> {
  await axios.post<void>(
    `/api/admin/v1/announcements/${announcementId}/reactivate/`
  );
}

export function useReactivateAnnouncement(announcementId: number) {
  const client = useQueryClient();

  return useMutation<void, AxiosError<APIErrorResponse>>({
    mutationFn: () => reactivateAnnouncement(announcementId),
    onSuccess: () => {
      // Invalidate the announcements list query to refresh the data
      client.invalidateQueries({ queryKey: ["announcements"] });
      client.invalidateQueries({
        queryKey: ["announcementDetails", announcementId],
      });
    },
  });
}
