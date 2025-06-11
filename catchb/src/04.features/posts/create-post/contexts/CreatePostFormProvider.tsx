import { useEffect, useMemo, useState } from "react";

import { CreatePostContext, CreatePostContextType } from "./useCreatePostForm";
import {
  CommunityForumType,
  CommunityTagType,
  useCommunity,
} from "@entities/community";
import { KeyboardWrapper } from "@shared/lib/keyboard";

export function CreatePostFormProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedForum, setSelectedForum] = useState<CommunityForumType>();
  const [selectedTag, setSelectedTag] = useState<CommunityTagType>();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [initialized, setInitialized] = useState<boolean>(false);

  const { activeForum } = useCommunity();

  useEffect(() => {
    setSelectedForum(activeForum);
    setSelectedTag(activeForum.tags[0]); // 기본적으로 첫 번째 태그를 선택
    setInitialized(true);
  }, [activeForum]);

  const value = useMemo<CreatePostContextType>(
    () => ({
      selectedForum: selectedForum!,
      setSelectedForum,
      selectedTag: selectedTag!,
      setSelectedTag,
      title,
      setTitle,
      content,
      setContent,
    }),
    [selectedForum, selectedTag, title, content]
  );

  if (!initialized || !selectedForum || !selectedTag) return null;

  return (
    <CreatePostContext.Provider value={value}>
      <KeyboardWrapper padding={16}>{children}</KeyboardWrapper>
    </CreatePostContext.Provider>
  );
}
