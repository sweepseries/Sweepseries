import "styled-components/native";

import { ThemeColorType } from "@shared/colors";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: ThemeColorType;
  }
}
