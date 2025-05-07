import { createContext } from "react";

import { ThemeColorType } from "./types";

interface ColorContextType {
  colors: ThemeColorType;
}

export const ColorContext = createContext<ColorContextType | undefined>(
  undefined
);
