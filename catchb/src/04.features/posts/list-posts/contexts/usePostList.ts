import { createContext, useContext } from "react";

import { CommunityTagType } from "@entities/community";
import { PostSimpleType } from "@entities/posts";

export interface PostsListContextType {
  posts: PostSimpleType[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  tagOptions: CommunityTagType[];
  selectedTag: CommunityTagType | null;
  setSelectedTag: (tag: CommunityTagType) => void;
  isLoading: boolean;
  isRefetching: boolean;
  refetch: () => void;
}

export const PostsListContext = createContext<PostsListContextType | undefined>(
  undefined
);

export const usePostList = () => {
  const context = useContext(PostsListContext);
  if (!context) {
    throw new Error("usePostList must be used within a PostsListProvider");
  }
  return context;
};
