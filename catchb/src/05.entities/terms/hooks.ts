import { useQuery } from "@tanstack/react-query";

import { fetchTerms } from "./api";
import { TermsAndConditionsType } from "./models";

export function useTerms() {
  return useQuery<TermsAndConditionsType[], Error>({
    queryKey: ["terms"],
    queryFn: fetchTerms,
  });
}
