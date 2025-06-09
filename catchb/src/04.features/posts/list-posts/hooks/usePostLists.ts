import { useContext } from "react";

import { PostListContext } from "../models/contexts";

export function usePostLists() {
  const context = useContext(PostListContext);
  if (!context) {
    throw new Error("usePostLists must be used within a PostListProvider");
  }
  return context;
}
