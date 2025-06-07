import type { QueryClient } from "@tanstack/react-query";

import type {
  InquiryThreadDetailType,
  InquiryThreadListResponseType,
} from "../models/types";

export function updateList(
  queryClient: QueryClient,
  inquiryId: number,
  data: InquiryThreadDetailType
) {
  queryClient.setQueryData(
    ["inquiries"],
    (prevData: InquiryThreadListResponseType) => {
      if (!prevData) return undefined;
      return {
        ...prevData,
        inquiries: prevData.inquiries.map((inquiry) =>
          inquiry.id === inquiryId
            ? { ...inquiry, status: data.status, category: data.category }
            : inquiry
        ),
      };
    }
  );
}
