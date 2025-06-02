import { EditorContent, useEditor } from "@tiptap/react";
import styled from "styled-components";

import { useEditTermContents } from "@entities/terms";
import { TextButton } from "@shared/ui/Buttons";
import {
  EditorToolbar,
  EditorWrapper,
  defaultExtensions,
} from "@shared/ui/Inputs";

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
    extensions: defaultExtensions,
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
      <EditorWrapper>
        <EditorToolbar editor={editor} />
        <EditorContent editor={editor} />
      </EditorWrapper>
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
