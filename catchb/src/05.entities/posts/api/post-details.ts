import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PostDetailType } from "../models/types";

async function fetchPostDetail(
  id: number,
  profileId?: string
): Promise<PostDetailType> {
  const params = profileId ? { profile: profileId } : undefined;

  const response = await axios.get(`/api/v1/posts/${id}/`, {
    params,
  });

  return response.data;
}

export function usePostDetail(id: number, profileId?: string) {
  return useQuery<PostDetailType, Error>({
    queryKey: ["postDetails", id, profileId],
    queryFn: () => fetchPostDetail(id, profileId),
  });
}
