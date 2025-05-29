import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, type AxiosResponse } from "axios";

import type {
  AdminTermsAndConditionsDetailType,
  UpdateContentsFormValues,
} from "../models/types";
import type { APIErrorResponse } from "@shared/api";

async function editTermContents(
  termId: number,
  data: UpdateContentsFormValues
): Promise<AxiosResponse<AdminTermsAndConditionsDetailType>> {
  return await axios.patch<AdminTermsAndConditionsDetailType>(
    `/api/admin/v1/terms/${termId}/content/`,
    data
  );
}
export function useEditTermContents(termId: number) {
  const client = useQueryClient();

  return useMutation<
    AxiosResponse<AdminTermsAndConditionsDetailType>,
    AxiosError<APIErrorResponse>,
    UpdateContentsFormValues
  >({
    mutationFn: (data) => editTermContents(termId, data),
    onSuccess: (response: AxiosResponse<AdminTermsAndConditionsDetailType>) => {
      client.setQueryData<AdminTermsAndConditionsDetailType>(
        ["termDetails", termId],
        () => response.data
      );
    },
  });
}
