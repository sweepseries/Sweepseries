import { useEffect } from "react";
import styled, { DefaultTheme } from "styled-components/native";

import { LoadingInquiries } from "./_loading";
import { InquirySimple, useInquiries } from "@entities/inquiries";
import { useAlert } from "@shared/lib/alert";
import { ErrorGuide } from "@shared/ui/Fallbacks";

export function InquiriesList() {
  const { data: inquiries, isLoading, isError } = useInquiries();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (isError) {
      showAlert({
        title: "오류 발생",
        message: "문의 내역을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
      });
    }
  }, [isError]);

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
