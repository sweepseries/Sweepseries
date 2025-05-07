import "styled-components/native";

import { ThemeColorType } from "@shared/lib/colors";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: ThemeColorType;
  }
}
