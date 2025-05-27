import type {
  AdminTermsAndConditionsType,
  AdminTermsAndConditionsDetailType,
} from "./types";

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

export const sampleTermDetails: AdminTermsAndConditionsDetailType = {
  id: 1,
  order: 1,
  title: "Terms of Service",
  is_active: true,
  is_required: true,
  latest_version_id: 1,
  versions: [
    {
      id: 1,
      content: "Initial version of the Terms of Service.",
      update_summary: "Initial version",
      created_at: "2025-05-01",
    },
    {
      id: 2,
      content: "Updated version of the Terms of Service with minor changes.",
      update_summary: "Minor updates",
      created_at: "2025-06-01",
    },
  ],
};
