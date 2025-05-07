import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import { ErrorResponse } from "@shared/api";

interface RequestCodeVariables {
  phone: string;
}

async function requestCode(phone: string): Promise<AxiosResponse<null>> {
  return axios.post("/v1/phone/code/", {
    phone,
  });
}

export function useRequestCode() {
  return useMutation<
    AxiosResponse<null>,
    AxiosError<ErrorResponse>,
    RequestCodeVariables
  >({
    mutationFn: ({ phone }) => requestCode(phone),
  });
}
