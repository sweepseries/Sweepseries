import styled from "styled-components";

import { LoadingList, LoadingTabs } from "@widgets/fallback/loading";
import { PageTitle } from "@widgets/layouts/title";
import {
  InquiriesHeader,
  InquiriesListProvider,
  InquiriesTableContents,
  InquiriesTableHeader,
  InquiriesTabs,
  useInquiriesList,
} from "@features/inquiries/list-inquiries";

export function InquiriesListPage() {
  return (
    <InquiriesListProvider>
      <Components />
    </InquiriesListProvider>
  );
}

function Components() {
  const { isLoading } = useInquiriesList();

  return (
    <Container>
      <PageTitle>고객 문의 관리</PageTitle>
      <InquiriesHeader />
      {isLoading ? (
        <div>
          <LoadingTabs />
          <LoadingList />
        </div>
      ) : (
        <div>
          <InquiriesTabs />
          <InquiriesTableHeader />
          <InquiriesTableContents />
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 1rem;
  gap: 0.25rem;
`;
