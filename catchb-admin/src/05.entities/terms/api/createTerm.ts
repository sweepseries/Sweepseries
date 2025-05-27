import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, type AxiosResponse } from "axios";

import type {
  AdminTermsAndConditionsType,
  NewTermsAndConditionsFormValues,
} from "../models/types";
import type { APIErrorResponse } from "@shared/api";

async function createTerm(
  data: NewTermsAndConditionsFormValues
): Promise<AxiosResponse<AdminTermsAndConditionsType>> {
  return await axios.post<AdminTermsAndConditionsType>(
    "/api/admin/v1/terms/",
    data
  );
}

export function useCreateTerm() {
  return useMutation<
    AxiosResponse<AdminTermsAndConditionsType>,
    AxiosError<APIErrorResponse>,
    NewTermsAndConditionsFormValues
  >({
    mutationFn: (data) => createTerm(data),
  });
}
