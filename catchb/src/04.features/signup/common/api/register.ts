import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import { RegisterDataType } from "../models/types";
import { ErrorResponse } from "@shared/api";

async function register(data: RegisterDataType): Promise<AxiosResponse<null>> {
  return await axios.post("/v1/register/", data);
}

export function useRegister() {
  return useMutation<
    AxiosResponse<null>,
    AxiosError<ErrorResponse>,
    RegisterDataType
  >({
    mutationFn: (data) => register(data),
  });
}
