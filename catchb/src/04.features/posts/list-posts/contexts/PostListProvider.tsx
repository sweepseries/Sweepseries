import { useCallback, useMemo, useState } from "react";

import { PostsListContext, PostsListContextType } from "./usePostList";
import { CommunityForumType, CommunityTagType } from "@entities/community";
import { usePosts } from "@entities/posts";
import { useBufferedInput } from "@shared/lib/throttler";

interface Props {
  forum: CommunityForumType;
  children: React.ReactNode;
}

export function PostListProvider({ forum, children }: Readonly<Props>) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<CommunityTagType | null>(null);

  const bufferedQuery = useBufferedInput(searchQuery, 300);
  const {
    data: posts,
    isLoading,
    isRefetching,
    refetch,
  } = usePosts(forum.name, bufferedQuery, selectedTag?.name);

  const refetchFn = useCallback(() => {
    refetch();
  }, [refetch]);

  const selectTag = useCallback(
    (tag: CommunityTagType) => {
      if (selectedTag?.id === tag.id) {
        setSelectedTag(null);
      } else {
        setSelectedTag(tag);
      }
    },
    [selectedTag]
  );

  const value = useMemo<PostsListContextType>(
    () => ({
      posts: posts?.results ?? [],
      searchQuery,
      setSearchQuery,
      tagOptions: forum.tags,
      selectedTag,
      setSelectedTag: selectTag,
      isLoading,
      isRefetching,
      refetch: refetchFn,
    }),
    [
      posts,
      searchQuery,
      selectedTag,
      isLoading,
      isRefetching,
      refetchFn,
      forum.tags,
      selectTag,
    ]
  );

  return (
    <PostsListContext.Provider value={value}>
      {children}
    </PostsListContext.Provider>
  );
}
