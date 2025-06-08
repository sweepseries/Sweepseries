import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import styled from "styled-components";

import { usePostInquiryResponse } from "@entities/inquiries";
import { useColors } from "@shared/lib/colors";
import { TextButton } from "@shared/ui/Buttons";
import {
  EditorToolbar,
  EditorWrapper,
  defaultExtensions,
} from "@shared/ui/Inputs";

interface Props {
  inquiryId: number;
  toggleMode: () => void;
}

export function InquiryResponseForm({
  inquiryId,
  toggleMode,
}: Readonly<Props>) {
  const { mutate: postInquiryResponse } = usePostInquiryResponse(inquiryId);
  const editor = useEditor({
    extensions: [
      ...defaultExtensions,
      Placeholder.configure({ placeholder: "답변 내용을 입력하세요." }),
    ],
    content: "",
  });
  const { colors } = useColors();

  if (!editor) {
    return null;
  }

  const saveNewResponse = async () => {
    if (editor.isEmpty) {
      window.alert("답변 내용을 입력해주세요.");
      return;
    }

    postInquiryResponse(
      { content: editor.getHTML() },
      {
        onSuccess: () => {
          window.alert("답변이 성공적으로 등록되었습니다.");
          toggleMode();
          editor.commands.setContent("");
        },
        onError: (error) => {
          window.alert(
            `답변 등록에 실패했습니다: ${
              error.response?.data?.error ?? "알 수 없는 오류"
            }`
          );
        },
      }
    );
  };

  return (
    <Container>
      <span>문의에 답변하기</span>
      <EditorWrapper>
        <EditorToolbar editor={editor} />
        <EditorContent editor={editor} />
      </EditorWrapper>
      <ButtonWrapper>
        <TextButton
          text="취소"
          onClick={toggleMode}
          color={colors.text700}
          backgroundColor={colors.gray700}
        />
        <TextButton text="답변 등록" onClick={saveNewResponse} />
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1.5;
  flex-direction: column;
  padding: 0 1rem;
  gap: 0.25rem;

  span {
    padding: 0 0.25rem;
    font-size: 1rem;
    font-weight: 500;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.25rem;

  > button:first-child {
    flex: 1;
  }

  > button:last-child {
    flex: 4;
  }
`;
