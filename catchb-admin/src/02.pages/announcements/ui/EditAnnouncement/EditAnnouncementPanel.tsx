import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

import {
  ModalInnerContainer,
  ModalContentVertical,
} from "@widgets/layouts/modals";
import { ModalTitle } from "@widgets/layouts/title";
import { SaveButton } from "@features/announcements/edit-announcement";
import {
  AnnouncementForm,
  AnnouncementFormProvider,
  type AdminCatchBAnnouncementDetailType,
  useAnnouncementForm,
} from "@entities/announcements";

export function EditAnnouncementPanel() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id || isNaN(Number(id))) {
    window.alert("오류가 발생했습니다. 다시 시도해주세요.");
    navigate("/announcements");
    return null;
  }

  return (
    <AnnouncementFormProvider>
      <Components id={Number(id)} />
    </AnnouncementFormProvider>
  );
}

interface Props {
  id: number;
}

function Components({ id }: Readonly<Props>) {
  const queryClient = useQueryClient();
  const { setTitle, setContent, setIsImportant } = useAnnouncementForm();

  useEffect(() => {
    // get data from queryClient
    const existingData =
      queryClient.getQueryData<AdminCatchBAnnouncementDetailType>([
        "announcementDetails",
        id,
      ]);

    if (existingData) {
      setTitle(existingData.title);
      setContent(existingData.content);
      setIsImportant(existingData.is_important);
    }
  }, [queryClient, id, setTitle, setContent, setIsImportant]);

  return (
    <ModalInnerContainer>
      <ModalTitle>공지 수정</ModalTitle>
      <ModalContentVertical>
        <AnnouncementForm />
        <SaveButton announcementId={id} />
      </ModalContentVertical>
    </ModalInnerContainer>
  );
}
