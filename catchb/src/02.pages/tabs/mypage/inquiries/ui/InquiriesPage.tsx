import styled, { DefaultTheme } from "styled-components/native";

import { InquiriesList } from "./_list";
import {
  InquiryForm,
  InquiryFormProvider,
  InquiryGuide,
  useInquiryForm,
} from "@features/inquiries/create-new-inquiry";

export function InquiriesPage() {
  return (
    <InquiryFormProvider>
      <InquiryPageComponent />
    </InquiryFormProvider>
  );
}

function InquiryPageComponent() {
  const { isOpen } = useInquiryForm();

  return (
    <Container>
      <InquiryGuide />
      {isOpen ? (
        <InquiryForm />
      ) : (
        <ListWrapper>
          <InquiriesList />
        </ListWrapper>
      )}
    </Container>
  );
}

const Container = styled.ScrollView`
  gap: 16px;
`;

const ListWrapper = styled.View`
  min-height: 70%;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;
