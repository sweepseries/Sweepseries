import styled from "styled-components";

import { type AdminCatchBFAQDetailType, FAQCategoryChip } from "@entities/faqs";
import { useColors } from "@shared/lib/colors";
import { TextChip } from "@shared/ui/Chips";

interface Props {
  faq: AdminCatchBFAQDetailType;
}

export function FAQQuestion({ faq }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <div>
      {!faq.is_active ? (
        <TextChip label="삭제됨" color={colors.error} />
      ) : (
        <FAQCategoryChip category={faq.category} isActive />
      )}
      <Question>{faq.question}</Question>
    </div>
  );
}

const Question = styled.span`
  font-size: 1.33rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text700};
`;
