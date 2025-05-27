import styled from "styled-components";

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
      <Container>
        <ModalTitle>약관 생성</ModalTitle>
        <ContentWrapper>
          <CreateTermFormLeft />
          <div>
            <VerticalDivider />
          </div>
          <CreateTermFormRight />
        </ContentWrapper>
      </Container>
    </CreateTermProvider>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  padding: 1rem 0;
  gap: 1rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;
