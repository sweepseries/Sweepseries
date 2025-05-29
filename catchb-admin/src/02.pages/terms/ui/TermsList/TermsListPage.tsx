import styled from "styled-components";

import { TermsListLoading } from "./_loading";
import { PageTitle } from "@widgets/layouts/title";
import {
  TermsListProvider,
  TermsTable,
  TermTabs,
  useTermsList,
} from "@features/terms/list-terms";

export function TermsListPage() {
  return (
    <TermsListProvider>
      <Components />
    </TermsListProvider>
  );
}

function Components() {
  const { isLoading } = useTermsList();

  return (
    <Container>
      <PageTitle>회원가입 약관 관리</PageTitle>
      <TermTabs />
      {isLoading ? <TermsListLoading /> : <TermsTable />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 1rem;
`;
