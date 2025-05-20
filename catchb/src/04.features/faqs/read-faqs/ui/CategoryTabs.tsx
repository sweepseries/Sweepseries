import styled, { DefaultTheme } from "styled-components/native";

import { useFAQList } from "../provider/FAQListProvider";
import { FAQCategoryButton } from "@entities/faqs";

export function CategoryTabs() {
  const { categories, selectedCategory, setSelectedCategory } = useFAQList();

  return (
    <Tabs>
      {categories.map((category) => (
        <FAQCategoryButton
          key={category}
          category={category}
          isSelected={selectedCategory === category}
          onPress={() => setSelectedCategory(category)}
        />
      ))}
    </Tabs>
  );
}

const Tabs = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 8px 0;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;
