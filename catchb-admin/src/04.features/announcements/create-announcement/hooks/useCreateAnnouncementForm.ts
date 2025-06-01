import { useContext } from "react";

import { CreateAnnouncementContext } from "../models/context";

export const useCreateAnnouncementForm = () => {
  const context = useContext(CreateAnnouncementContext);
  if (!context) {
    throw new Error(
      "useCreateAnnouncementForm must be used within a CreateAnnouncementProvider"
    );
  }
  return context;
};
