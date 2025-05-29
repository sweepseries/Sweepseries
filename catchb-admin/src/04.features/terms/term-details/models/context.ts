import { createContext } from "react";

import type { AdminTermsAndConditionsDetailType } from "@entities/terms";

export type TermDetailsContextType = {
  termDetails: AdminTermsAndConditionsDetailType | null;
  isLoading: boolean;
  selectedVersionId: number;
  setSelectedVersionId: (versionId: number) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
};

export const TermDetailsContext = createContext<
  TermDetailsContextType | undefined
>(undefined);
