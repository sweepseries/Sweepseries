import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PostListResponseType } from "../models/types";

interface FetchParams {
  forumName: string;
  search?: string;
  tag?: string;
}

async function fetchPosts({
  forumName,
  search,
  tag,
}: FetchParams): Promise<PostListResponseType> {
  const params: Record<string, string | undefined> = { forum: forumName };
  if (search) params.search = search;
  if (tag) params.tag = tag;

  const response = await axios.get(`/api/v1/posts/`, {
    params,
  });

  return response.data;
}

export function usePosts(forumName: string, search?: string, tag?: string) {
  return useQuery<PostListResponseType, Error>({
    queryKey: ["posts", forumName, search, tag],
    queryFn: () => fetchPosts({ forumName, search, tag }),
    enabled: Boolean(forumName),
  });
}
