import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import type { APIErrorResponse } from "@shared/api";

async function deleteFAQ(faqId: number): Promise<void> {
  await axios.delete<void>(`/api/admin/v1/faqs/${faqId}/`);
}

export function useDeleteFAQ(faqId: number) {
  const client = useQueryClient();

  return useMutation<void, AxiosError<APIErrorResponse>>({
    mutationFn: () => deleteFAQ(faqId),
    onSuccess: () => {
      // Invalidate the FAQs list query to refresh the data
      client.invalidateQueries({ queryKey: ["faqs"] });
      client.invalidateQueries({
        queryKey: ["faqDetails", faqId],
      });
    },
  });
}
