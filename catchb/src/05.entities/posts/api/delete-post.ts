import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { ErrorResponse } from "@shared/api";

async function deletePost(id: number, profileId: string): Promise<void> {
  await axios.delete(`/api/v1/posts/${id}/`, {
    headers: {
      "X-Profile-ID": profileId,
    },
  });
}

export function useDeletePost(id: number, profileId: string) {
  return useMutation<void, AxiosError<ErrorResponse>, void>({
    mutationFn: () => deletePost(id, profileId),
  });
}
