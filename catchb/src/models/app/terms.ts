export type TermsAndConditionsType = {
  id: number;
  title: string;
  content: string;
  is_required: boolean;
};

export type TermsAndConditionsCheckType = {
  id: number;
  is_checked: boolean;
  is_required: boolean;
};
