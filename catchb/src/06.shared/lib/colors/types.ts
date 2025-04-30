import { createContext } from "react";

import { lightColors } from "./colors";

export type ThemeColorType = {
  primary: string;
  primaryContainer: string;
  secondary: string;
  background: string;
  backgroundGray: string;
  border: string;
  highEmphasis: string;
  mediumEmphasis: string;
  lowEmphasis: string;
};

interface ColorContextType {
  colors: ThemeColorType;
}

export const ColorContext = createContext<ColorContextType>({
  colors: lightColors,
});
