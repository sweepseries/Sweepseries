import { useContext } from "react";

import { AnnouncementForm } from "../models/contexts";

export const useAnnouncementForm = () => {
  const context = useContext(AnnouncementForm);
  if (!context) {
    throw new Error(
      "useAnnouncementForm must be used within an AnnouncementFormProvider"
    );
  }
  return context;
};
