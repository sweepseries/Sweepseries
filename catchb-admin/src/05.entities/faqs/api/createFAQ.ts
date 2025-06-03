import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, type AxiosResponse } from "axios";

import type {
  FAQFormValuesType,
  AdminCatchBFAQDetailType,
} from "../models/types";
import type { APIErrorResponse } from "@shared/api";

async function createFAQ(
  data: FAQFormValuesType
): Promise<AxiosResponse<AdminCatchBFAQDetailType>> {
  return await axios.post<AdminCatchBFAQDetailType>(
    "/api/admin/v1/faqs/",
    data
  );
}

export function useCreateFAQ() {
  return useMutation<
    AxiosResponse<AdminCatchBFAQDetailType>,
    AxiosError<APIErrorResponse>,
    FAQFormValuesType
  >({
    mutationFn: (data) => createFAQ(data),
  });
}
