import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, type AxiosResponse } from "axios";

import type { InquiryResponseFormType } from "../models/forms.types";
import type { InquiryThreadDetailType } from "../models/types";
import { updateDetails } from "../utils/updateDetails";
import { updateList } from "../utils/updateList";
import type { APIErrorResponse } from "@shared/api";

async function postInquiryResponse(
  inquiryId: number,
  data: InquiryResponseFormType
): Promise<InquiryThreadDetailType> {
  const res: AxiosResponse<InquiryThreadDetailType> = await axios.post(
    `/api/admin/v1/inquiries/${inquiryId}/reply/`,
    data
  );

  return res.data;
}

export function usePostInquiryResponse(inquiryId: number) {
  const queryClient = useQueryClient();

  return useMutation<
    InquiryThreadDetailType,
    AxiosError<APIErrorResponse>,
    InquiryResponseFormType
  >({
    mutationFn: (data) => postInquiryResponse(inquiryId, data),
    onSuccess: (res) => {
      updateList(queryClient, inquiryId, res);
      updateDetails(queryClient, inquiryId, res);
    },
  });
}
