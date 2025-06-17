import styled, { DefaultTheme } from "styled-components/native";

import { PostLikeButton } from "@features/posts/like-post";
import {
  LoadingPostDetails,
  PostDetails,
  PostDetailsProvider,
  usePostDetails,
} from "@features/posts/post-details";
import { useCommunity } from "@entities/community";
import { CommunityStat } from "@entities/posts";
import { MenuOptionType } from "@shared/ui/Menus";

export function PostDetailsPage() {
  return (
    <PostDetailsProvider>
      <Components />
    </PostDetailsProvider>
  );
}

function Components() {
  const { activeProfile } = useCommunity();
  const { postDetails, isLoading, isAuthor } = usePostDetails();

  if (isLoading) {
    return (
      <Container>
        <LoadingPostDetails />
      </Container>
    );
  }

  if (!postDetails) return null;

  const menuOptions: MenuOptionType[] = isAuthor
    ? [
        {
          label: "수정하기",
          onPress: () => {},
        },
        {
          label: "삭제하기",
          onPress: () => {},
        },
      ]
    : [
        {
          label: "신고하기",
          onPress: () => {},
        },
        {
          label: "차단하기",
          onPress: () => {},
        },
      ];

  return (
    <Container>
      <PostDetails postDetails={postDetails} menuOptions={menuOptions} />
      <Footer>
        <CommunityStat icon="eye" value={postDetails.num_views} />
        <PostLikeButton
          postDetails={postDetails}
          profileId={activeProfile?.id}
        />
        <CommunityStat icon="comment" value={postDetails.num_comments} />
      </Footer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 8px 16px;
  gap: 12px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;
