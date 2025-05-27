import styled from "styled-components";

import { useCreateTermForm } from "../hooks/useCreateTermForm";
import { Checkbox, TextInput } from "@shared/ui/Inputs";

export function CreateTermFormLeft() {
  const { title, setTitle, isRequired, toggleIsRequired } = useCreateTermForm();

  return (
    <Container>
      <TextInput
        label="약관 제목"
        value={title}
        onChange={setTitle}
        placeholder="약관 제목을 입력하세요"
      />
      <Checkbox
        label="필수 약관"
        checked={isRequired}
        onToggle={toggleIsRequired}
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
