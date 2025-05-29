import styled from "styled-components";

import {
  ModalInnerContainer,
  ModalContentWrapper,
} from "@widgets/layouts/modals";
import { ModalTitle } from "@widgets/layouts/title";
import { DeleteTermButton } from "@features/terms/delete-term";
import { ReactivateTermButton } from "@features/terms/reactivate-term";
import {
  TermContents,
  TermDetailsProvider,
  TermVersions,
  useTermDetails,
} from "@features/terms/term-details";
import { VerticalDivider } from "@shared/ui/Dividers";

export function TermsDetailPanel() {
  return (
    <TermDetailsProvider>
      <Components />
    </TermDetailsProvider>
  );
}

function Components() {
  const { termDetails } = useTermDetails();

  if (!termDetails) return null;

  return (
    <Container>
      <Header>
        <ModalTitle>
          약관 내용 - ({termDetails.is_required ? "필수" : "선택"}){" "}
          {termDetails.title}
        </ModalTitle>
        {termDetails.is_active ? (
          <DeleteTermButton termId={termDetails.id} />
        ) : (
          <ReactivateTermButton termId={termDetails.id} />
        )}
      </Header>
      <ModalContentWrapper>
        <TermVersions />
        <div>
          <VerticalDivider />
        </div>
        <TermContents />
      </ModalContentWrapper>
    </Container>
  );
}

const Container = styled(ModalInnerContainer)`
  gap: 1.25rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 1.25rem;
`;
