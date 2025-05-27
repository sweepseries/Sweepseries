export type AdminTermsAndConditionsType = {
  id: number;
  order: number;
  title: string;
  is_active: boolean;
  is_required: boolean;
  created_at: string;
  updated_at: string;
};

export type NewTermsAndConditionsFormValues = {
  title: string;
  content: string;
  is_required: boolean;
};
