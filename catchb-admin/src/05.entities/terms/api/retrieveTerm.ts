import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { AdminTermsAndConditionsDetailType } from "../models/types";
import type { APIErrorResponse } from "@shared/api";

async function fetchTermDetails(
  termId: number
): Promise<AdminTermsAndConditionsDetailType> {
  const response = await axios.get<AdminTermsAndConditionsDetailType>(
    `/api/admin/v1/terms/${termId}/`
  );
  return response.data;
}

export function useRetrieveTerm(termId: number) {
  return useQuery<AdminTermsAndConditionsDetailType, APIErrorResponse>({
    queryKey: ["termDetails", termId],
    queryFn: () => fetchTermDetails(termId),
    enabled: !!termId, // Only run the query if termId is defined
  });
}
