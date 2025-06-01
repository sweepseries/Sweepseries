import styled from "styled-components";

import { useCreateTermForm } from "../hooks/useCreateTermForm";
import { TextButton } from "@shared/ui/Buttons";
import { TextArea } from "@shared/ui/Inputs";

export function CreateTermFormRight() {
  const { content, setContent, submit } = useCreateTermForm();

  return (
    <Container>
      <TextArea
        label="내용"
        value={content}
        onChange={setContent}
        placeholder="약관 내용을 입력하세요"
      />
      <TextButton text="등록" onClick={submit} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  padding: 0 1rem;
  gap: 1rem;
`;
