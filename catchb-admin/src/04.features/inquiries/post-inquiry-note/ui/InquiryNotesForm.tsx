import { useState } from "react";
import styled from "styled-components";

import { usePostInquiryNotes } from "@entities/inquiries";
import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  inquiryId: number;
}

export function InquiryNotesForm({ inquiryId }: Readonly<Props>) {
  const [newNote, setNewNote] = useState<string>("");
  const { mutate: postInquiryNote } = usePostInquiryNotes(inquiryId);
  const { colors } = useColors();

  const saveNewNote = async () => {
    if (!newNote.trim()) {
      window.alert("노트 내용을 입력해주세요.");
      return;
    }

    postInquiryNote(
      { content: newNote },
      {
        onSuccess: () => {
          window.alert("노트가 성공적으로 등록되었습니다.");
          setNewNote("");
        },
        onError: (error) => {
          window.alert(
            `노트 등록에 실패했습니다: ${
              error.response?.data?.error ?? "알 수 없는 오류"
            }`
          );
        },
      }
    );
  };

  return (
    <Container>
      <textarea
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="노트를 입력하세요."
        data-testid="inquiry-note-textarea"
      />
      <button onClick={saveNewNote} data-testid="post-note-button">
        <AppIcon icon="send" size={28} color={colors.primary} />
      </button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  textarea {
    flex: 1;
    margin-bottom: 0.25rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 4px;
    resize: none;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
