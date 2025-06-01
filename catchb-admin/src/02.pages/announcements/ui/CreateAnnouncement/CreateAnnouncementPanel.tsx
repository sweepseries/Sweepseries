import {
  ModalInnerContainer,
  ModalContentVertical,
} from "@widgets/layouts/modals";
import { ModalTitle } from "@widgets/layouts/title";
import {
  CreateAnnouncementForm,
  CreateAnnouncementFormProvider,
  SubmitButton,
} from "@features/announcements/create-announcement";

export function CreateAnnouncementPanel() {
  return (
    <CreateAnnouncementFormProvider>
      <ModalInnerContainer>
        <ModalTitle>공지 생성</ModalTitle>
        <ModalContentVertical>
          <CreateAnnouncementForm />
          <SubmitButton />
        </ModalContentVertical>
      </ModalInnerContainer>
    </CreateAnnouncementFormProvider>
  );
}
