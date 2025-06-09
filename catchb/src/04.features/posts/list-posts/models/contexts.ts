import { createContext } from "react";

import { CommunityForumType } from "@entities/posts";

export interface PostListContextType {
  posts: string[];
  isLoading: boolean;
  forums: CommunityForumType[];
  activeForum: CommunityForumType | null;
  setActiveForum: (forum: CommunityForumType) => void;
}

export const PostListContext = createContext<PostListContextType | undefined>(
  undefined
);
