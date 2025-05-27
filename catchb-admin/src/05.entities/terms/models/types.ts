export type AdminTermsAndConditionsType = {
  id: number;
  order: number;
  title: string;
  is_active: boolean;
  is_required: boolean;
  created_at: string;
  updated_at: string;
};

export type TermsAndConditionsVersionType = {
  [id: number]: {
    id: number;
    content: string;
    update_summary: string;
    created_at: string;
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

export type NewTermsAndConditionsFormValues = {
  title: string;
  content: string;
  is_required: boolean;
};
