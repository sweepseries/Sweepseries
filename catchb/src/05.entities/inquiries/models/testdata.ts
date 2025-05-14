import { InquiryThreadType } from "./types";

export const sampleInquiries: InquiryThreadType[] = [
  {
    id: 1,
    title: "Inquiry 1",
    category: "Category 1",
    status: "Open",
    created_at: "2023-10-01T12:00:00Z",
    is_updated: false,
  },
  {
    id: 2,
    title: "Inquiry 2",
    category: "Category 2",
    status: "Closed",
    created_at: "2023-10-02T12:00:00Z",
    is_updated: true,
  },
];
