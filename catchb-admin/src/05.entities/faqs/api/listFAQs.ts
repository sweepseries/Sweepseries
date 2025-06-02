import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { FAQListResponseType } from "../models/types";
import type { APIErrorResponse } from "@shared/api";

async function fetchAllFAQs(): Promise<FAQListResponseType> {
  const response = await axios.get<FAQListResponseType>("/api/admin/v1/faqs/");

  return response.data;
}

export function useFAQs() {
  return useQuery<FAQListResponseType, APIErrorResponse>({
    queryKey: ["faqs"],
    queryFn: fetchAllFAQs,
  });
}
