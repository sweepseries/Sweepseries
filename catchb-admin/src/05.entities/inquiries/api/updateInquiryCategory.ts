import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import type { InquiryCategoryUpdateFormType } from "../models/forms.types";
import type { InquiryThreadDetailType } from "../models/types";
import { updateDetails } from "../utils/updateDetails";
import { updateList } from "../utils/updateList";
import type { APIErrorResponse } from "@shared/api";

async function updateInquiryCategory(
  inquiryId: number,
  data: InquiryCategoryUpdateFormType
): Promise<InquiryThreadDetailType> {
  const res = await axios.patch<InquiryThreadDetailType>(
    `/api/admin/v1/inquiries/${inquiryId}/category/`,
    data
  );

  return res.data;
}

export function useUpdateInquiryCategory(inquiryId: number) {
  const queryClient = useQueryClient();

  return useMutation<
    InquiryThreadDetailType,
    AxiosError<APIErrorResponse>,
    InquiryCategoryUpdateFormType
  >({
    mutationFn: (data) => updateInquiryCategory(inquiryId, data),
    onSuccess: (res) => {
      updateList(queryClient, inquiryId, res);
      updateDetails(queryClient, inquiryId, res);
    },
  });
}
