import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { isAxiosError, type AxiosError, type AxiosResponse } from "axios";
import styled from "styled-components";

import { useCreateAnnouncementForm } from "../hooks/useCreateAnnouncementForm";
import {
  type AdminCatchBAnnouncementSimpleType,
  useCreateAnnouncement,
} from "@entities/announcements";
import type { APIErrorResponse } from "@shared/api";
import { TextButton } from "@shared/ui/Buttons";

export function SubmitButton() {
  const { title, content, isImportant, resetForm } =
    useCreateAnnouncementForm();
  const { mutate: createAnnouncement } = useCreateAnnouncement();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSubmitSuccess = (
    response: AxiosResponse<AdminCatchBAnnouncementSimpleType>
  ) => {
    resetForm();
    window.alert("공지사항이 성공적으로 생성되었습니다.");
    queryClient.setQueryData<AdminCatchBAnnouncementSimpleType[]>(
      ["announcements"],
      (old) => {
        if (!old) return [response.data];
        return [...old, response.data].sort((a, b) => a.id - b.id);
      }
    );

    navigate(`/announcements/${response.data.id}`);
  };

  const onSubmitError = (error: AxiosError<APIErrorResponse>) => {
    if (isAxiosError(error) && error.response?.data?.error) {
      window.alert(`공지 생성에 실패했습니다: ${error.response.data.error}`);
    } else {
      window.alert("공지 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const submit = async () => {
    createAnnouncement(
      {
        title,
        content,
        is_important: isImportant,
      },
      {
        onSuccess: onSubmitSuccess,
        onError: onSubmitError,
      }
    );
  };

  return (
    <Wrapper>
      <TextButton text="등록" onClick={submit} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
