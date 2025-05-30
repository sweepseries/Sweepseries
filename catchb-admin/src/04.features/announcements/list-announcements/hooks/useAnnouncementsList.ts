import { useContext } from "react";

import { AnnouncementsListContext } from "../models/context";

export const useAnnouncementsList = () => {
  const context = useContext(AnnouncementsListContext);
  if (!context) {
    throw new Error(
      "useAnnouncementsList must be used within an AnnouncementsListProvider"
    );
  }
  return context;
};
