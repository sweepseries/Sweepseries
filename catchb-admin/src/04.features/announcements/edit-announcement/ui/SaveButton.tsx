import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { isAxiosError, type AxiosError, type AxiosResponse } from "axios";
import styled from "styled-components";

import {
  type AdminCatchBAnnouncementDetailType,
  useAnnouncementForm,
  useEditAnnouncement,
} from "@entities/announcements";
import type { APIErrorResponse } from "@shared/api";
import { TextButton } from "@shared/ui/Buttons";

interface Props {
  announcementId: number;
}

export function SaveButton({ announcementId }: Readonly<Props>) {
  const { title, content, isImportant, resetForm } = useAnnouncementForm();
  const { mutate: editAnnouncement } = useEditAnnouncement(announcementId);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSubmitSuccess = (
    response: AxiosResponse<AdminCatchBAnnouncementDetailType>
  ) => {
    resetForm();
    window.alert("공지사항이 성공적으로 수정되었습니다.");
    queryClient.setQueryData<AdminCatchBAnnouncementDetailType>(
      ["announcementDetails", response.data.id],
      () => response.data
    );
    queryClient.invalidateQueries({ queryKey: ["announcements"] });

    navigate(`/announcements/${response.data.id}`);
  };

  const onSubmitError = (error: AxiosError<APIErrorResponse>) => {
    if (isAxiosError(error) && error.response?.data?.error) {
      window.alert(`공지 수정에 실패했습니다: ${error.response.data.error}`);
    } else {
      window.alert("공지 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const save = async () => {
    editAnnouncement(
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
      <TextButton text="저장" onClick={save} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
