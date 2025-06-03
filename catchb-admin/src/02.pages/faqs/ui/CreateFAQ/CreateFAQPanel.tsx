import {
  ModalInnerContainer,
  ModalContentVertical,
} from "@widgets/layouts/modals";
import { ModalTitle } from "@widgets/layouts/title";
import { SubmitNewFAQButton } from "@features/faqs/create-faq";
import { FAQForm, FAQFormProvider } from "@entities/faqs";

export function CreateFAQPanel() {
  return (
    <FAQFormProvider>
      <ModalInnerContainer>
        <ModalTitle>FAQ 생성</ModalTitle>
        <ModalContentVertical>
          <FAQForm />
          <SubmitNewFAQButton />
        </ModalContentVertical>
      </ModalInnerContainer>
    </FAQFormProvider>
  );
}
