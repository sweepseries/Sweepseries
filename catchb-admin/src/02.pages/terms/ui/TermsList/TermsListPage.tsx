import styled from "styled-components";

import { PageTitle } from "@widgets/layouts/title";
import {
  TermsListProvider,
  TermsTable,
  TermTabs,
} from "@features/terms/list-terms";

export function TermsListPage() {
  return (
    <TermsListProvider>
      <Components />
    </TermsListProvider>
  );
}

function Components() {
  return (
    <Container>
      <PageTitle>회원가입 약관 관리</PageTitle>
      <TermTabs />
      <TermsTable />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 1rem;
`;
