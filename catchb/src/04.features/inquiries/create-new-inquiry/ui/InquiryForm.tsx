import styled, { DefaultTheme } from "styled-components/native";

import { CustomerInformationSegment } from "./_customerinfo";
import { FormFooter } from "./_footer";
import { InquirySegment } from "./_inquiry";

export function InquiryForm() {
  return (
    <Container>
      <CustomerInformationSegment />
      <InquirySegment />
      <FormFooter />
    </Container>
  );
}

const Container = styled.View`
  padding: 16px 24px;
  gap: 16px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;
