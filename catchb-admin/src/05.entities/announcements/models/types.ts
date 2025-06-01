export type AdminCatchBAnnouncementSimpleType = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  is_important: boolean;
};

export type AdminCatchBAnnouncementDetailType = {
  content: string;
} & AdminCatchBAnnouncementSimpleType;

// Mutation을 위한 타입 //
export type NewCatchBAnnouncementFormValues = {
  title: string;
  content: string;
  is_important: boolean;
};
