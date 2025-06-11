import { createContext, useContext } from "react";

import { CommunityTagType } from "@entities/community";
import { PostType } from "@entities/posts";

export interface PostsListContextType {
  posts: PostType[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTag: CommunityTagType | null;
  setSelectedTag: (tag: CommunityTagType | null) => void;
  isLoading: boolean;
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
