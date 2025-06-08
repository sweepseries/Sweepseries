import type {
  InquiryCategoryType,
  InquiryStatusType,
  InquiryThreadDetailType,
  InquiryThreadListResponseType,
  InquiryThreadType,
} from "./types";
import {
  sampleAdmin,
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
    is_read: false,
  },
  {
    id: 2,
    title: "What payment methods are accepted?",
    category: sampleInquiryCategories[1],
    user: sampleAnonymousUserProfile,
    status: sampleInquiryStatuses[1],
    created_at: "2023-10-02T14:30:00Z",
    is_read: true,
  },
];

export const sampleInquiryThreadListResponse: InquiryThreadListResponseType = {
  inquiries: sampleInquiryThreads,
  categories: sampleInquiryCategories,
  status: sampleInquiryStatuses,
};

export const sampleInquiryThreadDetail: InquiryThreadDetailType = {
  ...sampleInquiryThreads[0],
  messages: [
    {
      id: 1,
      content: "I forgot my password, how can I reset it?",
      sender: "사용자",
      user: sampleUserProfile,
      created_at: "2023-10-01T12:05:00Z",
      updated_at: "2023-10-01T12:06:00Z",
      is_read: true,
    },
    {
      id: 2,
      content:
        "You can reset your password by clicking on 'Forgot Password' at the login page.",
      sender: "관리자",
      user: sampleAdmin,
      created_at: "2023-10-01T12:10:00Z",
      updated_at: "2023-10-01T12:11:00Z",
      is_read: false,
    },
    {
      id: 3,
      content: "상태를 '종료됨'(으)로 변경했습니다.",
      sender: "시스템",
      user: sampleAdmin,
      created_at: "2023-10-01T12:10:00Z",
      updated_at: "2023-10-01T12:11:00Z",
      is_read: false,
    },
  ],
  notes: [
    {
      id: 1,
      content: "This is a note for internal use.",
      admin: sampleAdmin,
      created_at: "2023-10-01T12:12:00Z",
      updated_at: "2023-10-01T12:13:00Z",
    },
  ],
  updated_at: "2023-10-01T12:15:00Z",
};
