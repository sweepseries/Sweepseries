import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import { WithdrawRequestData } from "../models/types";
import { ErrorResponse } from "@shared/api";

async function deleteAccount(
  data: WithdrawRequestData
): Promise<AxiosResponse<null>> {
  return await axios.post("/v1/withdraw/", data);
}

export function useDeleteAccount() {
  return useMutation<
    AxiosResponse<null>,
    AxiosError<ErrorResponse>,
    WithdrawRequestData
  >({
    mutationFn: (data) => deleteAccount(data),
  });
}
