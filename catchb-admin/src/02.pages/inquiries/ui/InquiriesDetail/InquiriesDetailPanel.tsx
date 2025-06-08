import styled from "styled-components";

import { InquiriesDetailLoading } from "./_loading";
import {
  ModalInnerContainer,
  ModalContentHorizontal,
} from "@widgets/layouts/modals";
import { ModalTitle } from "@widgets/layouts/title";
import {
  InquiryConversation,
  InquiryDetailsProvider,
  InquiryNotes,
  useInquiryDetails,
} from "@features/inquiries/inquiry-details";
import { InquiryNotesForm } from "@features/inquiries/post-inquiry-note";
import { InquiryResponseForm } from "@features/inquiries/post-inquiry-response";
import { CategoryUpdateMenu } from "@features/inquiries/switch-inquiry-category";
import { StatusUpdateMenu } from "@features/inquiries/update-inquiry-status";
import { InquiryDetailMetadata } from "@entities/inquiries";
import { useColors } from "@shared/lib/colors";
import { Divider, VerticalDivider } from "@shared/ui/Dividers";

export function InquiriesDetailPanel() {
  return (
    <InquiryDetailsProvider>
      <Components />
    </InquiryDetailsProvider>
  );
}

function Components() {
  const { inquiryDetails, mode, toggleMode, isLoading } = useInquiryDetails();
  const { colors } = useColors();

  if (isLoading) {
    return <InquiriesDetailLoading />;
  }

  if (!inquiryDetails) return null;

  return (
    <Container>
      <Header>
        <div>
          <StatusUpdateMenu
            inquiryId={inquiryDetails.id}
            currentStatus={inquiryDetails.status}
          />
          <CategoryUpdateMenu
            inquiryId={inquiryDetails.id}
            currentCategory={inquiryDetails.category}
          />
          <Title>문의 상세 - {inquiryDetails.title}</Title>
        </div>
        <InquiryDetailMetadata inquiry={inquiryDetails} />
      </Header>
      <Divider color={colors.gray500} />
      <ModalContentHorizontal>
        <InquiryConversation inquiry={inquiryDetails} />
        <VerticalDivider />
        {mode === "답변" ? (
          <InquiryResponseForm
            inquiryId={inquiryDetails.id}
            toggleMode={toggleMode}
          />
        ) : (
          <NotesWrapper>
            <InquiryNotes inquiry={inquiryDetails} />
            <Divider color={colors.gray700} />
            <InquiryNotesForm inquiryId={inquiryDetails.id} />
          </NotesWrapper>
        )}
      </ModalContentHorizontal>
    </Container>
  );
}

const Container = styled(ModalInnerContainer)`
  gap: 0.75rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  gap: 0.75rem;

  > div:first-child {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Title = styled(ModalTitle)`
  padding: 0;
`;

const NotesWrapper = styled.div`
  display: flex;
  flex: 1.5;
  flex-direction: column;
  padding: 0 1rem;
  gap: 0.5rem;
`;
