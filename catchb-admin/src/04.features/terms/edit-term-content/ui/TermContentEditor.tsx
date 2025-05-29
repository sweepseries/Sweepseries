import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styled from "styled-components";

import { useEditTermContents } from "@entities/terms";
import { TextButton } from "@shared/ui/Buttons";
import { EditorToolbar } from "@shared/ui/Inputs";

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

interface Props {
  termId: number;
  versionId: number;
  content: string;
  postSuccess: () => void;
}

export function TermContentEditor({
  termId,
  versionId,
  content,
  postSuccess,
}: Readonly<Props>) {
  const editor = useEditor({
    extensions,
    content,
  });
  const { mutate: editContents } = useEditTermContents(termId);

  if (!editor) {
    return null;
  }

  const saveContent = async () => {
    editContents(
      {
        version_id: versionId,
        content: editor.getHTML(),
      },
      {
        onSuccess: () => {
          window.alert("약관 내용이 성공적으로 저장되었습니다.");
          postSuccess();
        },
        onError: () => {
          window.alert("약관 내용 저장에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  return (
    <Container>
      <Wrapper>
        <EditorToolbar editor={editor} />
        <EditorContent editor={editor} />
      </Wrapper>
      <TextButton text="저장" onClick={saveContent} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;

  .ProseMirror {
    height: calc(100dvh - 360px);
    white-space: pre-wrap;
    overflow-y: auto;
    padding: 0.25rem 0.5rem;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray900};
  }
`;
