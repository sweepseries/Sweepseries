import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { FAQResponseType } from "../models/types";

async function fetchFAQs(): Promise<FAQResponseType> {
  const response = await axios.get("/v1/faqs/");

  return response.data;
}

export function useFAQs() {
  return useQuery<FAQResponseType, Error>({
    queryKey: ["faqs"],
    queryFn: fetchFAQs,
  });
}
