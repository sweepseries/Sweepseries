import { createContext, useContext } from "react";

import { CommunityForumType, CommunityTagType } from "@entities/community";

export interface CreatePostContextType {
  selectedForum: CommunityForumType;
  setSelectedForum: (forumId: CommunityForumType) => void;
  selectedTag: CommunityTagType;
  setSelectedTag: (tagId: CommunityTagType) => void;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
}

export const CreatePostContext = createContext<
  CreatePostContextType | undefined
>(undefined);

export function useCreatePostForm() {
  const context = useContext(CreatePostContext);

  if (!context) {
    throw new Error(
      "useCreatePostForm must be used within a CreatePostProvider"
    );
  }

  return context;
}
