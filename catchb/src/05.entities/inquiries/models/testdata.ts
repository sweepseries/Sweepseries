import { InquiryThreadType } from "./types";

export const sampleInquiries: InquiryThreadType[] = [
  {
    id: 1,
    title: "Inquiry 1",
    category: "Category 1",
    status: "답변완료",
    created_at: "2023-10-01T12:00:00Z",
    is_updated: false,
  },
  {
    id: 2,
    title: "Inquiry 2",
    category: "Category 2",
    status: "답변대기",
    created_at: "2023-10-02T12:00:00Z",
    is_updated: true,
  },
];
