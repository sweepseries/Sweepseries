import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { isAxiosError, type AxiosResponse } from "axios";
import styled from "styled-components";

import { useCreateTermForm } from "../hooks/useCreateTermForm";
import {
  type AdminTermsAndConditionsType,
  useCreateTerm,
} from "@entities/terms";
import { TextButton } from "@shared/ui/Buttons";
import {
  EditorToolbar,
  EditorWrapper,
  defaultExtensions,
} from "@shared/ui/Inputs";

export function CreateTermFormRight() {
  const { title, isRequired, setTitle, setIsRequired } = useCreateTermForm();
  const { mutate: createTerm } = useCreateTerm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const editor = useEditor({
    extensions: [
      ...defaultExtensions,
      Placeholder.configure({ placeholder: "약관 내용을 입력하세요." }),
    ],
    content: "",
  });

  if (!editor) {
    return null;
  }

  const onSubmitSuccess = (
    response: AxiosResponse<AdminTermsAndConditionsType>
  ) => {
    setTitle("");
    setIsRequired(false);
    window.alert("약관이 성공적으로 생성되었습니다.");
    queryClient.setQueryData<AdminTermsAndConditionsType[]>(
      ["terms"],
      (old) => {
        if (!old) return [response.data];
        return [...old, response.data].sort((a, b) => a.order - b.order);
      }
    );

    navigate(`/terms/${response.data.id}`);
  };

  const submitForm = async () => {
    createTerm(
      {
        title,
        content: editor.getHTML(),
        is_required: isRequired,
      },
      {
        onSuccess: onSubmitSuccess,
        onError: (error) => {
          if (isAxiosError(error) && error.response?.data?.error) {
            window.alert(
              `약관 생성에 실패했습니다: ${error.response.data.error}`
            );
          } else {
            window.alert("약관 생성에 실패했습니다. 다시 시도해주세요.");
          }
        },
      }
    );
  };

  return (
    <Container>
      <span>약관 내용</span>
      <EditorWrapper>
        <EditorToolbar editor={editor} />
        <EditorContent editor={editor} />
      </EditorWrapper>
      <TextButton text="등록" onClick={submitForm} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  padding: 0 1rem;
  gap: 1rem;

  span {
    padding: 0 0.25rem;
    font-size: 1.2rem;
    font-weight: 500;
  }
`;
