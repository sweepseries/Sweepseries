import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import type { InquiryStatusUpdateFormType } from "../models/forms.types";
import type { InquiryThreadDetailType } from "../models/types";
import { updateDetails } from "../utils/updateDetails";
import { updateList } from "../utils/updateList";
import type { APIErrorResponse } from "@shared/api";

async function updateInquiryStatus(
  inquiryId: number,
  data: InquiryStatusUpdateFormType
): Promise<InquiryThreadDetailType> {
  const res = await axios.patch<InquiryThreadDetailType>(
    `/api/admin/v1/inquiries/${inquiryId}/status/`,
    data
  );

  return res.data;
}

export function useUpdateInquiryStatus(inquiryId: number) {
  const queryClient = useQueryClient();

  return useMutation<
    InquiryThreadDetailType,
    AxiosError<APIErrorResponse>,
    InquiryStatusUpdateFormType
  >({
    mutationFn: (data) => updateInquiryStatus(inquiryId, data),
    onSuccess: (res) => {
      updateList(queryClient, inquiryId, res);
      updateDetails(queryClient, inquiryId, res);
    },
  });
}
