import { useContext } from "react";

import { AnnouncementDetailsContext } from "../models/context";

export const useAnnouncementDetails = () => {
  const context = useContext(AnnouncementDetailsContext);
  if (!context) {
    throw new Error(
      "useAnnouncementDetails must be used within an AnnouncementDetailsProvider"
    );
  }
  return context;
};
