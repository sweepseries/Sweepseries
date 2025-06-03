import styled from "styled-components";

import type { FAQCategoryType } from "../models/types";
import { FAQCategoryChip } from "./FAQCategoryChip";

interface Props {
  options: FAQCategoryType[];
  selectedCategory: FAQCategoryType;
  onSelectCategory: (category: FAQCategoryType) => void;
}

export function FAQCategoryTabs({
  options,
  selectedCategory,
  onSelectCategory,
}: Readonly<Props>) {
  return (
    <TabsWrapper>
      {options.map((category) => (
        <button
          key={category.name}
          onClick={() => onSelectCategory(category)}
          data-testid={`category-filter-${category.name}`}
        >
          <FAQCategoryChip
            category={category}
            isActive={selectedCategory.id === category.id}
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
