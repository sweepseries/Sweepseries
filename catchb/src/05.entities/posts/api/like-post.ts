import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { PostDetailType } from "../models/types";

async function likePost(id: number, profileId: string): Promise<void> {
  await axios.post(`/api/v1/posts/${id}/like/`, {
    profile: profileId,
  });
}

export function useLikePost(id: number, profileId: string) {
  const queryClient = useQueryClient();

  return useMutation({
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
