import styled from "styled-components";

import { FAQCategoriesLoading, FAQsListLoading } from "./_loading";
import { PageTitle } from "@widgets/layouts/title";
import { NavigateToCreateFAQButton } from "@features/faqs/create-faq";
import {
  FAQListProvider,
  FAQTableContents,
  FAQTableHeader,
  useFAQList,
} from "@features/faqs/list-faqs";
import { FAQCategoryTabs } from "@entities/faqs";

export function FAQsListPage() {
  return (
    <FAQListProvider>
      <Components />
    </FAQListProvider>
  );
}

function Components() {
  const { categoryOptions, selectedCategory, setSelectedCategory, isLoading } =
    useFAQList();

  return (
    <Container>
      <PageTitle>자주 묻는 질문 관리</PageTitle>
      {isLoading ? (
        <FAQCategoriesLoading />
      ) : (
        <>
          {selectedCategory === undefined ? null : (
            <Horizontal>
              <FAQCategoryTabs
                options={categoryOptions}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              <NavigateToCreateFAQButton />
            </Horizontal>
          )}
        </>
      )}
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

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;
