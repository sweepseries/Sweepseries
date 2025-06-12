import styled, { DefaultTheme } from "styled-components/native";

import { useCreatePostForm } from "../contexts/useCreatePostForm";
import {
  CommunityForumType,
  ForumSelect,
  TagSelect,
  useCommunity,
} from "@entities/community";
import { useColors } from "@shared/lib/colors";

export function CreatePostForm() {
  const { forums } = useCommunity();
  const {
    selectedForum,
    setSelectedForum,
    selectedTag,
    setSelectedTag,
    title,
    setTitle,
    content,
    setContent,
  } = useCreatePostForm();
  const { colors } = useColors();

  const selectForum = (forum: CommunityForumType) => {
    if (selectedForum.id === forum.id) return; // 이미 선택된 포럼이면 아무 작업도 하지 않음

    setSelectedForum(forum);
    setSelectedTag(forum.tags[0]); // 기본적으로 첫 번째 태그를 선택
  };

  return (
    <Container>
      <Selectors>
        <ForumSelect
          options={forums}
          selectedForum={selectedForum}
          onSelect={selectForum}
        />
        <TagSelect
          options={selectedForum.tags}
          selectedTag={selectedTag}
          onSelect={setSelectedTag}
        />
      </Selectors>
      <HorizontalWrapper>
        <TitleInput
          value={title}
          onChangeText={setTitle}
          placeholder="제목을 입력해주세요. (최대 40자)"
          testID="title-input"
        />
        <TitleLength>
          <TitleLength
            style={{
              color: title.length > 40 ? colors.error : colors.mediumEmphasis,
            }}
          >
            {title.length}
          </TitleLength>
          /40
        </TitleLength>
      </HorizontalWrapper>
      <ContentInput
        value={content}
        onChangeText={setContent}
        placeholder="내용을 입력해주세요."
        multiline
        textAlignVertical="top"
        testID="content-input"
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: flex-start;
  gap: 16px;
`;

const Selectors = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const HorizontalWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
  gap: 4px;
`;

const TitleLength = styled.Text`
  margin-bottom: 4px;
  font-size: 14px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mediumEmphasis};
`;

const TitleInput = styled.TextInput`
  flex: 1;
  width: 100%;
  padding: 8px 4px;
  font-size: 18px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.border};
`;

const ContentInput = styled.TextInput`
  width: 100%;
  min-height: 100px;
  padding: 12px 8px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
`;
