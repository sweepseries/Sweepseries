import { type AdminTermsAndConditionsType } from "./types";

export const sampleTerms: AdminTermsAndConditionsType[] = [
  {
    id: 1,
    order: 1,
    title: "Terms of Service",
    is_active: true,
    is_required: true,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    id: 2,
    order: 2,
    title: "Privacy Policy",
    is_active: true,
    is_required: true,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    id: 3,
    order: 3,
    title: "Term 3",
    is_active: false,
    is_required: false,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
];
