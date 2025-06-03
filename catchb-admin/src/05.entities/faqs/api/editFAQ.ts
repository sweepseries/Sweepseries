import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, type AxiosResponse } from "axios";

import type {
  AdminCatchBFAQDetailType,
  FAQFormValuesType,
} from "../models/types";
import type { APIErrorResponse } from "@shared/api";

async function editFAQ(
  faqId: number,
  data: FAQFormValuesType
): Promise<AxiosResponse<AdminCatchBFAQDetailType>> {
  return await axios.put<AdminCatchBFAQDetailType>(
    `/api/admin/v1/faqs/${faqId}/`,
    data
  );
}

export function useEditFAQ(faqId: number) {
  return useMutation<
    AxiosResponse<AdminCatchBFAQDetailType>,
    AxiosError<APIErrorResponse>,
    FAQFormValuesType
  >({
    mutationFn: (data) => editFAQ(faqId, data),
  });
}
