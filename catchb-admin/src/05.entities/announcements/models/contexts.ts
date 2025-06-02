import { createContext } from "react";

export type AnnouncementFormType = {
  title: string;
  content: string;
  isImportant: boolean;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  toggleIsImportant: () => void;
  resetForm: () => void;
};

export const AnnouncementForm = createContext<AnnouncementFormType | undefined>(
  undefined
);
