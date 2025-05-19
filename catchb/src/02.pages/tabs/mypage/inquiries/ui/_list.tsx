import { useEffect } from "react";

import { LoadingInquiries } from "./loading";
import { ErrorGuide } from "@widgets/fallbacks";
import { InquirySimple, useInquiries } from "@entities/inquiries";
import { useAlert } from "@shared/lib/alert";

export function InquiriesList() {
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

  if (isLoading) return <LoadingInquiries />;

  if (!inquiries || inquiries.length === 0) {
    return <ErrorGuide message="문의 내역이 없습니다." />;
  }

  return (
    <>
      {inquiries.map((inquiry) => (
        <InquirySimple key={inquiry.id} inquiry={inquiry} />
      ))}
    </>
  );
}
