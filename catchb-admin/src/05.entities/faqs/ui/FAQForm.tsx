import styled from "styled-components";

import { useFAQForm } from "../hooks/useFAQForm";
import { FAQCategoryTabs } from "./FAQCategoryTabs";
import { TextArea, TextInput } from "@shared/ui/Inputs";

export function FAQForm() {
  const {
    question,
    setQuestion,
    answer,
    setAnswer,
    categoryOptions,
    selectedCategory,
    setSelectedCategory,
  } = useFAQForm();

  if (!categoryOptions || !selectedCategory) return null;

  return (
    <Container>
      <FAQCategoryTabs
        options={categoryOptions}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <TextInput
        label="질문"
        value={question}
        onChange={setQuestion}
        placeholder="질문을 입력하세요"
      />
      <TextArea
        label="답변"
        value={answer}
        onChange={setAnswer}
        placeholder="답변을 입력하세요"
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 1rem;
  gap: 1rem;
`;
