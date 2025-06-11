import styled, { DefaultTheme } from "styled-components/native";

import { useInquiriesList } from "../contexts/useInquiriesList";
import { LoadingInquiries } from "./_loading";
import { InquirySimple } from "@entities/inquiries";
import { ErrorGuide } from "@shared/ui/Fallbacks";

export function InquiriesList() {
  const { inquiries, isLoading } = useInquiriesList();

  if (isLoading) return <LoadingInquiries />;

  if (!inquiries || inquiries.length === 0) {
    return <ErrorGuide message="문의 내역이 없습니다." />;
  }

  return (
    <ListWrapper>
      {inquiries.map((inquiry) => (
        <InquirySimple key={inquiry.id} inquiry={inquiry} />
      ))}
    </ListWrapper>
  );
}

const ListWrapper = styled.View`
  min-height: 70%;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;
