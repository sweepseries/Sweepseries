import { createContext } from "react";

import { PostType } from "@entities/posts";

export interface PostsListContextType {
  posts: PostType[];
}

export const PostsListContext = createContext<PostsListContextType | undefined>(
  undefined
);
