import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled, { DefaultTheme } from "styled-components/native";

import { usePostList } from "../contexts/usePostList";
import { CommunityChipTag } from "@entities/community";

/**
 * 게시글 목록에서 태그 필터를 제공하는 컴포넌트.
 * 사용자가 선택한 태그에 따라 게시글을 필터링할 수 있다.
 * 각 태그는 CommunityChipTag 컴포넌트를 사용하여 표시된다.
 */

export function TagFilter() {
  const { tagOptions, selectedTag, setSelectedTag } = usePostList();

  return (
    <Container>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 4, gap: 8 }}
      >
        {tagOptions.map((tag) => (
          <TouchableOpacity
            key={tag.id}
            onPress={() => setSelectedTag(tag)}
            testID={`tag-filter-${tag.name}`}
          >
            <CommunityChipTag tag={tag} active={selectedTag?.id === tag.id} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  padding: 4px 16px 4px 12px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;
