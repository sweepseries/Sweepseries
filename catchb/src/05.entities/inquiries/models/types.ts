export type InquiryThreadType = {
  id: number;
  title: string;
  category: string;
  status: string;
  created_at: string;
  is_updated: boolean;
};

export type InquiryCategoryType = {
  id: number;
  name: string;
};

export type MemberInquiryCreatePostType = {
  user: string; // UUID
  category: number;
  title: string;
  content: string;
};

export type GuestInquiryCreatePostType = {
  name: string;
  email: string;
  category: number;
  title: string;
  content: string;
};
