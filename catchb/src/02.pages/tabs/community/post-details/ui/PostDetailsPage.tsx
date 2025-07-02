import styled, { DefaultTheme } from "styled-components/native";

import { DeletePostButton } from "@features/posts/delete-post";
import { PostLikeButton } from "@features/posts/like-post";
import {
  LoadingPostDetails,
  MenuItemType,
  PostDetails,
  PostDetailsProvider,
  usePostDetails,
} from "@features/posts/post-details";
import { useCommunity } from "@entities/community";
import { CommunityStat } from "@entities/posts";

export function PostDetailsPage() {
  return (
    <PostDetailsProvider>
      <Components />
    </PostDetailsProvider>
  );
}

function Components() {
  const { activeProfile } = useCommunity();
  const { postDetails, isLoading, isAuthor, closeMenu } = usePostDetails();

  if (isLoading) {
    return (
      <Container>
        <LoadingPostDetails />
      </Container>
    );
  }

  if (!postDetails) return null;

  const menuOptions: MenuItemType[] = isAuthor
    ? [
        //수정하기 버튼
        {
          key: "delete-post",
          component: (
            <DeletePostButton
              postId={postDetails.id}
              profileId={activeProfile!.id}
              closeMenu={closeMenu}
            />
          ),
        },
      ]
    : [
        //신고하기 버튼,
        //차단하기 버튼,
      ];

  return (
    <Container>
      <PostDetails postDetails={postDetails} menuItems={menuOptions} />
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
