import styled from "styled-components";

import type { AdminCatchBFAQSimpleType } from "../models/types";
import { FAQCategoryChip } from "./FAQCategoryChip";

interface Props {
  faq: AdminCatchBFAQSimpleType;
}

export function FAQSimple({ faq }: Readonly<Props>) {
  return (
    <FAQRow>
      <IndexColumn>{faq.id}</IndexColumn>
      <TitleColumn>{faq.question}</TitleColumn>
      <CategoryColumn>
        <FAQCategoryChip category={faq.category} isActive />
      </CategoryColumn>
    </FAQRow>
  );
}

const FAQRow = styled.div`
  display: flex;
  align-items: center;

  font-size: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray700};
`;

const TableData = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  height: 36px;

  color: ${({ theme }) => theme.colors.text700};
  border-left: 1px solid ${({ theme }) => theme.colors.gray700};
`;

const IndexColumn = styled(TableData)`
  width: 3rem;
  border-left: none;
`;

const TitleColumn = styled(TableData)`
  display: block;
  flex: 1;
  justify-content: flex-start;
  min-width: 0;
  max-width: 24rem;
  border-left: 1px solid ${({ theme }) => theme.colors.gray700};
  font-size: 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CategoryColumn = styled(TableData)`
  width: 5rem;
  border-left: 1px solid ${({ theme }) => theme.colors.gray700};
`;
