import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { TermsAndConditionsType } from "../models/terms";

async function fetchTermsDetail(id: string): Promise<TermsAndConditionsType> {
  const response = await axios.get(`/v1/terms/${id}/`);

  return response.data;
}

export function useTermsDetail(id: string) {
  return useQuery<TermsAndConditionsType, Error>({
    queryKey: ["terms", id],
    queryFn: () => fetchTermsDetail(id),
  });
}
