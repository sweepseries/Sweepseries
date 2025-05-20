import { createContext } from "react";

import type { ThemeColorType } from "./types";

interface ColorContextType {
  colors: ThemeColorType;
  toggleTheme: () => void;
}

export const ColorContext = createContext<ColorContextType | undefined>(
  undefined
);
