import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { InquiryThreadDetailType } from "../models/types";
import type { APIErrorResponse } from "@shared/api";

async function fetchInquiryDetails(
  inquiryId: number
): Promise<InquiryThreadDetailType> {
  const response = await axios.get<InquiryThreadDetailType>(
    `/api/admin/v1/inquiries/${inquiryId}/`
  );
  return response.data;
}

export function useInquiryDetails(inquiryId: number) {
  return useQuery<InquiryThreadDetailType, APIErrorResponse>({
    queryKey: ["inquiryDetails", inquiryId],
    queryFn: () => fetchInquiryDetails(inquiryId),
    enabled: !!inquiryId, // Only run the query if inquiryId is defined
  });
}
