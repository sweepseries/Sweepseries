import { useEffect, useMemo } from "react";
import { router, useLocalSearchParams } from "expo-router";

import { PostDetailsContext, PostDetailsContextType } from "./usePostDetails";
import { useCommunity } from "@entities/community";
import { usePostDetail } from "@entities/posts";
import { useAlert } from "@shared/lib/alert";

export function PostDetailsProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { showAlert } = useAlert();

  if (!id || isNaN(Number(id))) {
    showAlert({
      title: "오류 발생",
      message: "게시글을 찾을 수 없습니다.",
    });
    router.replace("/community/posts");
    return null;
  }

  return <InnerProvider id={Number(id)}>{children}</InnerProvider>;
}

function InnerProvider({
  id,
  children,
}: Readonly<{
  id: number;
  children: React.ReactNode;
}>) {
  const { activeProfile } = useCommunity();
  const {
    data: postDetails,
    isLoading,
    isError,
  } = usePostDetail(id, activeProfile?.id);
  const { showAlert } = useAlert();

  const isAuthor = useMemo(() => {
    if (!postDetails || !activeProfile) return false;
    return postDetails.author.id === activeProfile.id;
  }, [activeProfile, postDetails]);

  useEffect(() => {
    if (isError) {
      showAlert({
        title: "오류 발생",
        message: "게시글을 불러오는 데 실패했습니다.",
      });
      router.replace("/community/posts");
    }
  }, [isError, showAlert, router]);

  const value = useMemo<PostDetailsContextType>(
    () => ({
      postDetails: postDetails ?? null,
      isLoading,
      isAuthor,
    }),
    [postDetails, isLoading, isAuthor]
  );

  return (
    <PostDetailsContext.Provider value={value}>
      {children}
    </PostDetailsContext.Provider>
  );
}
