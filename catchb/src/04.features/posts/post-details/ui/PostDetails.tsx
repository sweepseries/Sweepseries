import styled, { DefaultTheme } from "styled-components/native";

import { PostImages } from "./_images";
import { CommunityProfile } from "@entities/community";
import { PostDetailType, PostTag } from "@entities/posts";
import { formatTimeSince } from "@shared/lib/datetime";

/**
 * 게시글 내용
 * - 태그, 작성자 프로실, 작성 시간, 제목, 내용
 */

interface Props {
  postDetails: PostDetailType;
}

export function PostDetails({ postDetails }: Readonly<Props>) {
  return (
    <Container>
      <PostTag tag={postDetails.tag} />
      <ProfileWrapper>
        <CommunityProfile profile={postDetails.author} size={24} />
        <ProfileNameText>{postDetails.author.name}</ProfileNameText>
        <TimeSinceText>
          {formatTimeSince(new Date(postDetails.created_at))}
        </TimeSinceText>
      </ProfileWrapper>
      <Title>{postDetails.title}</Title>
      <Content>{postDetails.content}</Content>
      {postDetails.images.length > 0 && (
        <PostImages images={postDetails.images} />
      )}
    </Container>
  );
}

const Container = styled.View`
  padding: 8px 16px;
  gap: 8px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;

const Horizontal = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileWrapper = styled(Horizontal)`
  gap: 4px;
`;

const ProfileNameText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.highEmphasis};
`;

const TimeSinceText = styled.Text`
  margin-left: 4px;
  font-size: 12px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.highEmphasis};
`;

const Content = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mediumEmphasis};
  line-height: 20px;
`;
