import type { QueryClient } from "@tanstack/react-query";

import type { InquiryThreadDetailType } from "../models/types";

export function updateDetails(
  queryClient: QueryClient,
  inquiryId: number,
  data: InquiryThreadDetailType
) {
  queryClient.setQueryData(["inquiryDetails", inquiryId], data);
}
