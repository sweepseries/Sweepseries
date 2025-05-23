import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { AdminTermsAndConditionsType } from "../models/types";
import type { APIErrorResponse } from "@shared/api";

async function fetchAllTerms(): Promise<AdminTermsAndConditionsType[]> {
  const response = await axios.get<AdminTermsAndConditionsType[]>(
    "/admin/v1/terms/"
  );
  return response.data;
}

export function useTerms() {
  return useQuery<AdminTermsAndConditionsType[], APIErrorResponse>({
    queryKey: ["terms"],
    queryFn: fetchAllTerms,
  });
}
