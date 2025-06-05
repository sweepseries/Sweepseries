import type {
  InquiryCategoryType,
  InquiryStatusType,
  InquiryThreadListResponseType,
  InquiryThreadType,
} from "./types";
import {
  sampleAnonymousUserProfile,
  sampleUserProfile,
} from "@shared/lib/auth";

export const sampleInquiryCategories: InquiryCategoryType[] = [
  { id: 1, name: "Technical", color: "#FF5733" },
  { id: 2, name: "Billing", color: "#33FF57" },
  { id: 3, name: "General", color: "#3357FF" },
];

export const sampleInquiryStatuses: InquiryStatusType[] = [
  { id: 1, name: "Open", color: "#28a745" },
  { id: 2, name: "In Progress", color: "#ffc107" },
  { id: 3, name: "Closed", color: "#dc3545" },
];

export const sampleInquiryThreads: InquiryThreadType[] = [
  {
    id: 1,
    title: "How to reset my password?",
    category: sampleInquiryCategories[0],
    user: sampleUserProfile,
    status: sampleInquiryStatuses[0],
    created_at: "2023-10-01T12:00:00Z",
  },
  {
    id: 2,
    title: "What payment methods are accepted?",
    category: sampleInquiryCategories[1],
    user: sampleAnonymousUserProfile,
    status: sampleInquiryStatuses[1],
    created_at: "2023-10-02T14:30:00Z",
  },
];

export const sampleInquiryThreadListResponse: InquiryThreadListResponseType = {
  inquiries: sampleInquiryThreads,
  categories: sampleInquiryCategories,
  status: sampleInquiryStatuses,
};
