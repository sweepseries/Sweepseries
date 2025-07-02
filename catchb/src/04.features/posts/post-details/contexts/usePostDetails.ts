import { createContext, useContext } from "react";

import { PostDetailType } from "@entities/posts";

export type PostDetailsContextType = {
  postDetails: PostDetailType | null;
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  isLoading: boolean;
  isAuthor: boolean;
};

export const PostDetailsContext = createContext<
  PostDetailsContextType | undefined
>(undefined);

export const usePostDetails = (): PostDetailsContextType => {
  const context = useContext(PostDetailsContext);
  if (!context) {
    throw new Error("usePostDetails must be used within a PostDetailsProvider");
  }
  return context;
};
