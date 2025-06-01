import styled from "styled-components";

import { useCreateAnnouncementForm } from "../hooks/useCreateAnnouncementForm";
import { Checkbox, TextArea, TextInput } from "@shared/ui/Inputs";

export function CreateAnnouncementForm() {
  const {
    title,
    setTitle,
    content,
    setContent,
    isImportant,
    toggleIsImportant,
  } = useCreateAnnouncementForm();

  return (
    <Container>
      <Header>
        <TextInput
          label="공지 제목"
          value={title}
          onChange={setTitle}
          placeholder="약관 제목을 입력하세요"
        />
      </Header>
      <TextArea
        label="공지 내용"
        value={content}
        onChange={setContent}
        placeholder="공지 내용을 입력하세요"
      />
      <Checkbox
        label="중요 공지"
        checked={isImportant}
        onToggle={toggleIsImportant}
        icon="pin"
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 1rem;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  > div:last-child {
    flex: 1;
  }
`;
