import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import type { APIErrorResponse } from "@shared/api";

async function reactivateFAQ(faqId: number): Promise<void> {
  await axios.post<void>(`/api/admin/v1/faqs/${faqId}/reactivate/`);
}

export function useReactivateFAQ(faqId: number) {
  const client = useQueryClient();

  return useMutation<void, AxiosError<APIErrorResponse>>({
    mutationFn: () => reactivateFAQ(faqId),
    onSuccess: () => {
      // Invalidate the FAQs list query to refresh the data
      client.invalidateQueries({ queryKey: ["faqs"] });
      client.invalidateQueries({
        queryKey: ["faqDetails", faqId],
      });
    },
  });
}
