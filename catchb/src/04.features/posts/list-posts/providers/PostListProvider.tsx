import { useEffect, useMemo, useState } from "react";

import { PostListContext, PostListContextType } from "../models/contexts";
import { CommunityForumType } from "@entities/posts";

export function PostListProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [forums, setForums] = useState<CommunityForumType[]>([]);
  const [activeForum, setActiveForum] = useState<CommunityForumType | null>(
    null
  );

  useEffect(() => {
    setForums([
      {
        id: 1,
        name: "덕아웃",
      },
      {
        id: 2,
        name: "드래프트",
      },
      {
        id: 3,
        name: "마켓",
      },
    ]);
    setActiveForum({
      id: 1,
      name: "덕아웃",
    });
  }, []);

  const value = useMemo<PostListContextType>(
    () => ({
      posts: [],
      isLoading: false,
      forums: forums,
      activeForum: activeForum,
      setActiveForum: setActiveForum,
    }),
    [forums, activeForum, setActiveForum]
  );

  return (
    <PostListContext.Provider value={value}>
      {children}
    </PostListContext.Provider>
  );
}
