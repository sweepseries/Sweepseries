import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { InquiryThreadListResponseType } from "../models/types";
import type { APIErrorResponse } from "@shared/api";

async function fetchAllInquiries(): Promise<InquiryThreadListResponseType> {
  const response = await axios.get<InquiryThreadListResponseType>(
    "/api/admin/v1/inquiries/"
  );

  return response.data;
}

export function useInquiries() {
  return useQuery<InquiryThreadListResponseType, APIErrorResponse>({
    queryKey: ["inquiries"],
    queryFn: fetchAllInquiries,
  });
}
