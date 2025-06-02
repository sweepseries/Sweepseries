import styled from "styled-components";

import { FAQCategoriesLoading, FAQsListLoading } from "./_loading";
import { PageTitle } from "@widgets/layouts/title";
import {
  FAQCategoryTabs,
  FAQListProvider,
  FAQTableContents,
  FAQTableHeader,
  useFAQList,
} from "@features/faqs/list-faqs";

export function FAQsListPage() {
  return (
    <FAQListProvider>
      <Components />
    </FAQListProvider>
  );
}

function Components() {
  const { isLoading } = useFAQList();

  return (
    <Container>
      <PageTitle>자주 묻는 질문 관리</PageTitle>
      {isLoading ? <FAQCategoriesLoading /> : <FAQCategoryTabs />}
      <FAQTableHeader />
      {isLoading ? <FAQsListLoading /> : <FAQTableContents />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 1rem;
`;
