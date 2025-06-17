import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { PostDetailType } from "../models/types";
import { ErrorResponse } from "@shared/api";

async function likePost(id: number, profileId: string): Promise<void> {
  await axios.post(`/api/v1/posts/${id}/like/`, null, {
    headers: {
      "X-Profile-ID": profileId,
    },
  });
}

export function useLikePost(id: number, profileId: string) {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ErrorResponse>, void>({
    mutationFn: () => likePost(id, profileId),
    onSuccess: () => {
      queryClient.setQueryData(
        ["postDetails", id, profileId],
        (oldData: PostDetailType | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            is_liked: !oldData.is_liked,
            num_likes: oldData.is_liked
              ? oldData.num_likes - 1
              : oldData.num_likes + 1,
          };
        }
      );
    },
  });
}
