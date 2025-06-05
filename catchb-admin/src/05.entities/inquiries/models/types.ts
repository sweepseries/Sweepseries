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
};

export type InquiryThreadListResponseType = {
  inquiries: InquiryThreadType[];
  categories: InquiryCategoryType[];
  status: InquiryStatusType[];
};
