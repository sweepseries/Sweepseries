import styled, { DefaultTheme } from "styled-components/native";

import { usePostList } from "../contexts/usePostList";
import { Searchbar } from "@shared/ui/Searchbars";

/**
 * 게시글 목록에서 검색 기능을 제공하는 Searchbar 컴포넌트.
 */

export function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePostList();

  return (
    <Container testID="posts-searchbar">
      <Searchbar
        placeholder="제목 또는 내용으로 검색하세요"
        value={searchQuery}
        onChange={setSearchQuery}
      />
    </Container>
  );
}

const Container = styled.View`
  padding: 12px 16px 0 16px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;
