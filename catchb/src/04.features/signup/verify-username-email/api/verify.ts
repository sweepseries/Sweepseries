import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import { ErrorResponse } from "@shared/api";

interface CheckUsernameEmailVariables {
  username: string;
  email: string;
}

async function checkUsernameEmail(
  username: string,
  email: string
): Promise<AxiosResponse<null>> {
  return axios.post("/v1/check-username-email/", {
    username,
    email,
  });
}

export function useUsernameEmailCheck() {
  return useMutation<
    AxiosResponse<null>,
    AxiosError<ErrorResponse>,
    CheckUsernameEmailVariables
  >({
    mutationFn: ({ username, email }) => checkUsernameEmail(username, email),
  });
}
