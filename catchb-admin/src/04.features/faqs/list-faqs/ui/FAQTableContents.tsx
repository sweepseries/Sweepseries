import styled from "styled-components";

import { useFAQList } from "../hooks/useFAQList";
import { FAQSimple } from "@entities/faqs";

export function FAQTableContents() {
  const { faqs } = useFAQList();

  if (!faqs || faqs.length === 0) {
    return <Empty>자주 묻는 질문이 없습니다.</Empty>;
  }

  return (
    <List>
      {faqs.map((faq) => (
        <FAQSimple faq={faq} key={faq.id} />
      ))}
    </List>
  );
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 32px;
`;

const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text900};
`;
