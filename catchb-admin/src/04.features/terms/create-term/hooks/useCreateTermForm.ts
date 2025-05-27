import { useContext } from "react";

import { CreateTermContext } from "../models/context";

export const useCreateTermForm = () => {
  const context = useContext(CreateTermContext);
  if (!context) {
    throw new Error("useCreateTerm must be used within a CreateTermProvider");
  }
  return context;
};
