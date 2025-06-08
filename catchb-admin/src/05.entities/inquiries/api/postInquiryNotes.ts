import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, type AxiosResponse } from "axios";

import type { InquiryNoteFormType } from "../models/forms.types";
import type { InquiryThreadDetailType } from "../models/types";
import { updateDetails } from "../utils/updateDetails";
import { updateList } from "../utils/updateList";
import type { APIErrorResponse } from "@shared/api";

async function postInquiryNotes(
  inquiryId: number,
  data: InquiryNoteFormType
): Promise<InquiryThreadDetailType> {
  const res: AxiosResponse<InquiryThreadDetailType> = await axios.post(
    `/api/admin/v1/inquiries/${inquiryId}/notes/`,
    data
  );

  return res.data;
}

export function usePostInquiryNotes(inquiryId: number) {
  const queryClient = useQueryClient();

  return useMutation<
    InquiryThreadDetailType,
    AxiosError<APIErrorResponse>,
    InquiryNoteFormType
  >({
    mutationFn: (data) => postInquiryNotes(inquiryId, data),
    onSuccess: (res) => {
      updateList(queryClient, inquiryId, res);
      updateDetails(queryClient, inquiryId, res);
    },
  });
}
