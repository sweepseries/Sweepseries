export type AdminTermsAndConditionsType = {
  id: number;
  order: number;
  title: string;
  is_active: boolean;
  is_required: boolean;
  has_content: boolean;
  created_at: string;
  updated_at: string;
};

export type TermsAndConditionsVersionType = {
  [id: number]: {
    id: number;
    content: string;
    created_at: string;
    update_summary: string;
    is_admin_only: boolean;
    has_content: boolean;
  };
};

export type AdminTermsAndConditionsDetailType = {
  id: number;
  order: number;
  title: string;
  is_active: boolean;
  is_required: boolean;
  latest_version_id: number;
  versions: TermsAndConditionsVersionType;
};

// Mutation을 위한 타입 //
export type NewTermsAndConditionsFormValues = {
  title: string;
  content: string;
  is_required: boolean;
};

export type UpdateContentsFormValues = {
  version_id: number;
  content: string;
};
