import styled from "styled-components";

import {
  ModalInnerContainer,
  ModalContentWrapper,
} from "@widgets/layouts/modals";
import { ModalTitle } from "@widgets/layouts/title";
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
      <ModalTitle>
        약관 내용 - ({termDetails.is_required ? "필수" : "선택"}){" "}
        {termDetails.title}
      </ModalTitle>
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
