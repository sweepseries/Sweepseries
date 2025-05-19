import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import {
  MemberInquiryCreatePostType,
  GuestInquiryCreatePostType,
  InquiryThreadType,
} from "../models/types";
import { ErrorResponse } from "@shared/api";

async function createInquiry(
  data: MemberInquiryCreatePostType | GuestInquiryCreatePostType
): Promise<AxiosResponse<InquiryThreadType>> {
  return await axios.post<InquiryThreadType>("/v1/inquiries/", data);
}

export function useCreateInquiry() {
  return useMutation<
    AxiosResponse<InquiryThreadType>,
    AxiosError<ErrorResponse>,
    MemberInquiryCreatePostType | GuestInquiryCreatePostType
  >({
    mutationFn: (data) => createInquiry(data),
  });
}
