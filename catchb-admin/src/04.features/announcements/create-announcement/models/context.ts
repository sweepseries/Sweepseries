import { createContext } from "react";

export type CreateAnnouncementContextType = {
  title: string;
  content: string;
  isImportant: boolean;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  toggleIsImportant: () => void;
  resetForm: () => void;
};

export const CreateAnnouncementContext = createContext<
  CreateAnnouncementContextType | undefined
>(undefined);
