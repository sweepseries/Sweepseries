import type { AnonymousUserType, UserProfileType } from "@shared/lib/auth";

export type InquiryCategoryType = {
  id: number;
  name: string;
  color: string;
};

export type InquiryStatusType = {
  id: number;
  name: string;
  color: string;
};

export type InquiryThreadType = {
  id: number;
  title: string;
  category: InquiryCategoryType;
  user: UserProfileType | AnonymousUserType;
  status: InquiryStatusType;
  created_at: string;
  is_read: boolean;
};

export type InquiryThreadListResponseType = {
  inquiries: InquiryThreadType[];
  categories: InquiryCategoryType[];
  status: InquiryStatusType[];
};

export type InquiryMessageType = {
  id: number;
  sender: "사용자" | "관리자" | "시스템";
  content: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
};

export type InquiryThreadDetailType = {
  id: number;
  title: string;
  category: InquiryCategoryType;
  user: UserProfileType | AnonymousUserType;
  status: InquiryStatusType;
  created_at: string;
  updated_at: string;
  is_read: boolean;
  messages: InquiryMessageType[];
};
