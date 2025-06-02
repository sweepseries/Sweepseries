import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import type { APIErrorResponse } from "@shared/api";

async function deleteAnnouncement(announcementId: number): Promise<void> {
  await axios.delete<void>(`/api/admin/v1/announcements/${announcementId}/`);
}

export function useDeleteAnnouncement(announcementId: number) {
  const client = useQueryClient();

  return useMutation<void, AxiosError<APIErrorResponse>>({
    mutationFn: () => deleteAnnouncement(announcementId),
    onSuccess: () => {
      // Invalidate the announcements list query to refresh the data
      client.invalidateQueries({ queryKey: ["announcements"] });
      client.invalidateQueries({
        queryKey: ["announcementDetails", announcementId],
      });
    },
  });
}
