import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import { ErrorResponse } from "@shared/api";

interface CheckPasswordsVariables {
  password: string;
  password2: string;
}

async function checkPassword(
  password: string,
  password2: string
): Promise<AxiosResponse<null>> {
  return axios.post("/api/v1/check-password/", {
    password,
    password2,
  });
}

export function usePasswordCheck() {
  return useMutation<
    AxiosResponse<null>,
    AxiosError<ErrorResponse>,
    CheckPasswordsVariables
  >({
    mutationFn: ({ password, password2 }) => checkPassword(password, password2),
  });
}
