import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { AdminCatchBFAQDetailType } from "../models/types";
import type { APIErrorResponse } from "@shared/api";

async function fetchFAQDetails(
  faqId: number
): Promise<AdminCatchBFAQDetailType> {
  const response = await axios.get<AdminCatchBFAQDetailType>(
    `/api/admin/v1/faqs/${faqId}/`
  );
  return response.data;
}

export function useRetrieveFAQ(faqId: number) {
  return useQuery<AdminCatchBFAQDetailType, APIErrorResponse>({
    queryKey: ["faqDetails", faqId],
    queryFn: () => fetchFAQDetails(faqId),
    enabled: !!faqId, // Only run the query if faqId is defined
  });
}
