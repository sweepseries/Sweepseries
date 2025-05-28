import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import type { APIErrorResponse } from "@shared/api";

async function deleteTerm(termId: number): Promise<void> {
  await axios.delete<void>(`/api/admin/v1/terms/${termId}/`);
}

export function useDeleteTerm(termId: number) {
  const client = useQueryClient();

  return useMutation<void, AxiosError<APIErrorResponse>, number>({
    mutationFn: () => deleteTerm(termId),
    onSuccess: () => {
      // Invalidate the terms list query to refresh the data
      client.invalidateQueries({ queryKey: ["terms"] });
      client.invalidateQueries({ queryKey: ["termDetails", termId] });
    },
  });
}
