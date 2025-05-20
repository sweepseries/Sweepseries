import { useContext } from "react";

import { ColorContext } from "../models/context";

export const useTheme = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
