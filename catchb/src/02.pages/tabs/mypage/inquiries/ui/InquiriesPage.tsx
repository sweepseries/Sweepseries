import { useEffect } from "react";
import styled, { DefaultTheme } from "styled-components/native";

import { LoadingInquiries } from "./loading";
import { ErrorGuide } from "@widgets/fallbacks";
import {
  InquiryForm,
  InquiryFormProvider,
  InquiryGuide,
  useInquiryForm,
} from "@features/inquiries/create-new-inquiry";
import { InquirySimple, useInquiries } from "@entities/inquiries";
import { useAlert } from "@shared/lib/alert";

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
      {isOpen ? <InquiryForm /> : <InquiriesList />}
    </Container>
  );
}

function InquiriesList() {
  const { showAlert } = useAlert();
  const { data: inquiries, isLoading, isError } = useInquiries();

  useEffect(() => {
    if (isError) {
      showAlert({
        title: "오류 발생",
        message: "문의 내역을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
      });
    }
  }, [isError]);

  if (isLoading) {
    return (
      <List>
        <LoadingInquiries />
      </List>
    );
  }

  if (!inquiries || inquiries.length === 0) {
    return (
      <List>
        <ErrorGuide message="문의 내역이 없습니다." />
      </List>
    );
  }

  return (
    <List>
      {inquiries.map((inquiry) => (
        <InquirySimple key={inquiry.id} inquiry={inquiry} />
      ))}
    </List>
  );
}

const Container = styled.ScrollView`
  gap: 16px;
`;

const List = styled.View`
  min-height: 70%;
  padding: 16px 24px;
  gap: 16px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;
