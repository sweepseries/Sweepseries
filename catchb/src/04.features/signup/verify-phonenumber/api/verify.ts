import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import { ErrorResponse } from "@shared/api";

async function verifyCode(phone: string, code: string) {
  return axios.post("/api/v1/phone/code/verify/", {
    phone,
    code,
  });
}

export function useVerifyCode() {
  return useMutation<
    AxiosResponse<null>,
    AxiosError<ErrorResponse>,
    { phone: string; code: string }
  >({
    mutationFn: ({ phone, code }) => verifyCode(phone, code),
  });
}
