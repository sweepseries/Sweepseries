import {
  ModalInnerContainer,
  ModalContentWrapper,
} from "@widgets/layouts/modals";
import { ModalTitle } from "@widgets/layouts/title";
import {
  CreateTermFormLeft,
  CreateTermFormRight,
  CreateTermProvider,
} from "@features/terms/create-term";
import { VerticalDivider } from "@shared/ui/Dividers";

export function CreateTermPanel() {
  return (
    <CreateTermProvider>
      <ModalInnerContainer>
        <ModalTitle>약관 생성</ModalTitle>
        <ModalContentWrapper>
          <CreateTermFormLeft />
          <div>
            <VerticalDivider />
          </div>
          <CreateTermFormRight />
        </ModalContentWrapper>
      </ModalInnerContainer>
    </CreateTermProvider>
  );
}
