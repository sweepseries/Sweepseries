import {
  ModalInnerContainer,
  ModalContentVertical,
} from "@widgets/layouts/modals";
import { ModalTitle } from "@widgets/layouts/title";
import {
  CreateAnnouncementForm,
  SubmitButton,
} from "@features/announcements/create-announcement";
import { AnnouncementFormProvider } from "@entities/announcements";

export function CreateAnnouncementPanel() {
  return (
    <AnnouncementFormProvider>
      <ModalInnerContainer>
        <ModalTitle>공지 생성</ModalTitle>
        <ModalContentVertical>
          <CreateAnnouncementForm />
          <SubmitButton />
        </ModalContentVertical>
      </ModalInnerContainer>
    </AnnouncementFormProvider>
  );
}
