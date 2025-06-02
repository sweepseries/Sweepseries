import styled from "styled-components";

import { useFAQList } from "../hooks/useFAQList";
import { FAQCategoryChip } from "@entities/faqs";

export function FAQCategoryTabs() {
  const { categoryOptions, selectedCategory, setSelectedCategory } =
    useFAQList();

  return (
    <TabsWrapper>
      {categoryOptions.map((category) => (
        <button
          key={category.name}
          onClick={() => setSelectedCategory(category)}
          data-testid={`category-filter-${category.name}`}
        >
          <FAQCategoryChip
            category={category}
            isActive={selectedCategory?.id === category.id}
          />
        </button>
      ))}
    </TabsWrapper>
  );
}

const TabsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
