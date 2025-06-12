import { router } from "expo-router";

import { useCreatePostForm } from "../contexts/useCreatePostForm";
import { useCommunity } from "@entities/community";
import { useCreatePost } from "@entities/posts";
import { useAlert } from "@shared/lib/alert";
import { TextButton } from "@shared/ui/Buttons";

export function SubmitButton() {
  const { activeProfile } = useCommunity();
  const { selectedForum, selectedTag, title, content, imageFiles } =
    useCreatePostForm();
  const { mutate: createPost } = useCreatePost();
  const { showAlert } = useAlert();

  const submitNewPost = () => {
    if (!activeProfile) {
      showAlert({
        title: "로그인이 필요합니다",
        message: "게시물을 작성하려면 로그인이 필요합니다.",
      });
      return;
    }

    createPost(
      {
        forum_id: selectedForum.id,
        author_id: activeProfile.id, // 임시로 1로 설정, 실제로는 로그인한 사용자 ID를 사용해야 함
        tag_id: selectedTag.id,
        title,
        content,
        image_files: imageFiles,
      },
      {
        onSuccess: (data) => {
          router.replace(`/community/posts/${data.id}`);
        },
        onError: (error) => {
          showAlert({
            title: "게시물 작성 실패",
            message:
              error.response?.data?.error ?? "알 수 없는 오류가 발생했습니다.",
          });
        },
      }
    );
  };

  return <TextButton text="등록" onPress={submitNewPost} />;
}
