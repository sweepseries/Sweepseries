import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { TermsAndConditionsType } from "../models/types";

async function fetchTerms(): Promise<TermsAndConditionsType[]> {
  const response = await axios.get("/v1/terms/");

  return response.data;
}

export function useTerms() {
  return useQuery<TermsAndConditionsType[], Error>({
    queryKey: ["terms"],
    queryFn: fetchTerms,
  });
}
