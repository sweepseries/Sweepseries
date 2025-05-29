import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, type AxiosResponse } from "axios";

import type { UpdateContentsFormValues } from "../models/types";
import type { APIErrorResponse } from "@shared/api";

async function editTermContents(
  termId: number,
  data: UpdateContentsFormValues
): Promise<AxiosResponse<void>> {
  return await axios.patch<void>(
    `/api/admin/v1/terms/${termId}/content/`,
    data
  );
}
export function useEditTermContents(termId: number) {
  const client = useQueryClient();

  return useMutation<
    AxiosResponse<void>,
    AxiosError<APIErrorResponse>,
    UpdateContentsFormValues
  >({
    mutationFn: (data) => editTermContents(termId, data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["termDetails", termId] });
    },
  });
}
