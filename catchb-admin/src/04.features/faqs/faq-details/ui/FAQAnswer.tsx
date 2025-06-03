import styled from "styled-components";

import type { AdminCatchBFAQDetailType } from "@entities/faqs";

interface Props {
  faq: AdminCatchBFAQDetailType;
}

export function FAQAnswer({ faq }: Readonly<Props>) {
  return <Text>{faq.answer}</Text>;
}

const Text = styled.span`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  overflow-y: auto;
  word-break: break-word;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.colors.text900};
`;
