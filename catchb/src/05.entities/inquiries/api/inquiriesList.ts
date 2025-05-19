import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { InquiryThreadType } from "../models/types";

async function fetchInquiries(): Promise<InquiryThreadType[]> {
  const response = await axios.get("/v1/inquiries/");

  return response.data;
}

export function useInquiries() {
  return useQuery<InquiryThreadType[], Error>({
    queryKey: ["inquiries"],
    queryFn: fetchInquiries,
  });
}
