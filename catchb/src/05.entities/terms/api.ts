import axios from "axios";

import { TermsAndConditionsType } from "./models";

export async function fetchTerms(): Promise<TermsAndConditionsType[]> {
  const response = await axios.get("/v1/terms/");

  return response.data;
}

export async function fetchTermsDetail(
  id: string
): Promise<TermsAndConditionsType> {
  const response = await axios.get(`/v1/terms/${id}/`);

  return response.data;
}
