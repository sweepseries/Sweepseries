import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import styled, { DefaultTheme } from "styled-components/native";

import { useCommunity } from "@entities/community";
import { useDeletePost } from "@entities/posts";
import { useAlert } from "@shared/lib/alert";
import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  postId: number;
  profileId: string;
  closeMenu: () => void;
}

export function DeletePostButton({
  postId,
  profileId,
  closeMenu,
}: Readonly<Props>) {
  const queryClient = useQueryClient();
  const { activeForum } = useCommunity();
  const { mutate: deletePost } = useDeletePost(postId, profileId);
  const { showAlert } = useAlert();
  const { colors } = useColors();

  const handleDeletePost = () => {
    deletePost(undefined, {
      onSuccess: () => {
        queryClient.removeQueries({
          queryKey: ["postDetails", postId, profileId],
        });
        queryClient.invalidateQueries({
          queryKey: ["posts", activeForum.name],
        });
        showAlert({
          title: "성공",
          message: "게시글이 삭제되었습니다.",
        });
        closeMenu();
        router.back();
      },
      onError: () => {
        showAlert({
          title: "오류 발생",
          message: "게시글 삭제에 실패했습니다. 다시 시도해주세요.",
        });
      },
    });
  };

  return (
    <Container onPress={handleDeletePost} testID="delete-post-button">
      <AppIcon icon="trash" size={16} color={colors.error} />
      <Label>삭제하기</Label>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 84px;
  padding: 8px;
  gap: 4px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.error};
`;
