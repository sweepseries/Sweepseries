import styled, { DefaultTheme } from "styled-components/native";

import { usePostDetails } from "../contexts/usePostDetails";
import { CommunityStat } from "@entities/posts";

/**
 * 게시글 상세 페이지 하단에 게시글 통계 정보를 표시하는 컴포넌트.
 * 조회수, 좋아요 수, 댓글 수를 아이콘과 함께 보여준다.
 * 좋아요 부근을 누르면, 좋아요/취소 처리
 * 댓글 부근을 누르면 댓글 input이 올라온다.
 */

export function PostDetailFooter() {
  const { postDetails } = usePostDetails();

  if (!postDetails) return null;

  return (
    <Container>
      <CommunityStat icon="eye" value={postDetails.num_views} />
      <CommunityStat icon="heart" value={postDetails.num_likes} />
      <CommunityStat icon="comment" value={postDetails.num_comments} />
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 8px 16px;
  gap: 12px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;
